import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import type {
  FoodItemType,
  FoodPortionsArray,
  IdParam,
  NutrientsType,
} from "../api.types.js";

const foodItemRepo = AppDataSource.getRepository(FoodItem);

const { FDC_API_BASE_URL, FDC_API_KEY } = process.env;

interface UsdaByFdcIdResponse {
  fdcId: number;
  gtinUpc: string;
  description: string;
  publicationDate: string;
  foodClass: string;
  brandOwner?: string;
  brandName?: string;
  foodCategory?: string | { description: string };
  wweiaFoodCategory?: {
    wweiaFoodCategoryDescription: string;
  };
  brandedFoodCategory?: string;
  foodNutrients: Array<{
    nutrient: {
      name: string;
      number: string;
      unitName: string;
    };
    amount: number;
  }>;
  servingSize?: number;
  servingSizeUnit?: string;
  householdServingFullText?: string;
  foodPortions?: Array<{
    id: number;
    gramWeight: number;
    amount: number;
    modifier: string;
    portionDescription?: string;
    measureUnit: {
      id: number;
      name: string;
      abbreviation: string;
    };
  }>;
  packageWeight?: string;
  labelNutrients?: {
    calories: { value: number };
    protein: { value: number };
    carbohydrates: { value: number };
    fat: { value: number };
  };
}

export const getFoodItemById: RequestHandler<IdParam> = async (
  req,
  res,
  next
) => {
  try {
    const fdcId = parseInt(req.params.id);
    if (!FDC_API_BASE_URL || !FDC_API_KEY || !fdcId)
      throw new Error("Invalid configuration");

    console.time("existing item");
    // check for and return existing fooditem in local db
    const existingItem = await foodItemRepo.findOneBy({ fdcId });
    if (existingItem) {
      res.status(200).send(existingItem);
      return;
    }
    console.timeEnd("existing item");

    console.time("api fetch");

    // parse nutrient data and fetch data
    enum usdaCodes {
      protein = "203",
      fat = "204",
      carbs = "205",
      kcal = "208",
    }

    const params = new URLSearchParams({
      api_key: FDC_API_KEY,
      nutrients: Object.values(usdaCodes).join(","),
    });

    // fooditem doesnt exist, fetch from api
    const response = await fetch(`${FDC_API_BASE_URL}/food/${fdcId}?${params}`);
    const data = (await response.json()) as UsdaByFdcIdResponse;

    console.timeEnd("api fetch");

    const nutrients: NutrientsType = {
      calories: { per100g: 0 },
      protein: { per100g: 0 },
      carbs: { per100g: 0 },
      fat: { per100g: 0 },
    };

    //macro parsing, foods may have 1 or 2 objects labelNutrients and/or foodNutrients. label nutrients are per serving, foodnutrients are per 100g
    //per serving
    console.time("label and food nutrients");
    if (data.labelNutrients && Object.keys(data.labelNutrients).length) {
      nutrients.calories.perServing = data.labelNutrients.calories.value;
      nutrients.protein.perServing = data.labelNutrients.protein.value;
      nutrients.carbs.perServing = data.labelNutrients.carbohydrates.value;
      nutrients.fat.perServing = data.labelNutrients.fat.value;
    }
    // per 100g
    if (data.foodNutrients) {
      for (const record of data.foodNutrients) {
        if (!record.nutrient) {
          console.warn("skipping record: ", record.nutrient);
          continue;
        }
        switch (record.nutrient.number) {
          case usdaCodes.kcal:
            nutrients.calories.per100g = record.amount;
            break;
          case usdaCodes.protein:
            nutrients.protein.per100g = record.amount;
            break;
          case usdaCodes.carbs:
            nutrients.carbs.per100g = record.amount;
            break;
          case usdaCodes.fat:
            nutrients.fat.per100g = record.amount;
            break;
        }
      }
    }
    console.timeEnd("label and food nutrients");

    console.time("foodPortions array");
    // parse food portion data
    let foodPortions: FoodPortionsArray = [];
    if (data.foodClass === "Branded") {
      foodPortions.push({
        portionDescription: data.householdServingFullText,
        servingSize: data.servingSize,
        servingSizeUnit: data.servingSizeUnit,
      });
    } else if (data.foodPortions) {
      for (const portion of data.foodPortions) {
        foodPortions.push({
          portionDescription: portion.portionDescription,
          gramWeight: portion.gramWeight,
          amount: portion?.amount,
        });
      }
    }
    console.timeEnd("foodPortions array");

    console.time("normalized food category");
    // normalizes multiple possible data structures for food category field
    const normalizedFoodCategory = (item: UsdaByFdcIdResponse) => {
      if (item.brandedFoodCategory) {
        return item.brandedFoodCategory;
      }

      if (typeof item.foodCategory === "string") {
        return item.foodCategory;
      }

      if (item.wweiaFoodCategory) {
        return item.wweiaFoodCategory.wweiaFoodCategoryDescription;
      }

      if (item.foodCategory?.description) {
        return item.foodCategory.description;
      }

      return "Uncategorized";
    };
    console.timeEnd("normalized food category");

    console.time("insert");
    // insert opertation
    const newFoodItemData: FoodItemType = {
      fdcId: data.fdcId,
      gtinUpc: data.gtinUpc,
      publicationDate: new Date(data.publicationDate),
      lastCheckForUpdate: new Date(),
      brandOwner: data?.brandOwner || undefined,
      brandName: data?.brandName || undefined,
      foodCategory: normalizedFoodCategory(data),
      foodClass: data.foodClass,
      description: data.description,
      packageWeight: data?.packageWeight || "",
      nutrients,
      foodPortions,
    };

    const newFoodItemCreate = foodItemRepo.create(newFoodItemData);
    const newFoodItem = await foodItemRepo.save(newFoodItemCreate);

    console.timeEnd("insert");

    res.status(200).json(newFoodItem);
  } catch (error) {
    next(error);
  }
};

type SearchQuery = {
  query: string;
  page?: string;
};

interface SearchQueryResponse {
  foods: [];
  totalPages: number;
  currentPage: number;
}

export const searchFoodItems: RequestHandler<
  unknown,
  unknown,
  unknown,
  SearchQuery
> = async (req, res, next) => {
  const PAGE_SIZE = "10";

  try {
    const { query, page } = req.query;

    const params = new URLSearchParams();
    params.append("query", query);
    params.append("pageNumber", String(page));
    params.append("pageSize", PAGE_SIZE);

    const response = await fetch(
      `${FDC_API_BASE_URL}/foods/search?api_key=${FDC_API_KEY}&${String(
        params
      )}`
    );

    const { foods, totalPages, currentPage } =
      (await response.json()) as SearchQueryResponse;

    const nextCursor = currentPage < totalPages ? currentPage + 1 : undefined;

    res.status(200).json({
      nextCursor,
      foods,
    });
  } catch (error) {
    next(error);
  }
};
