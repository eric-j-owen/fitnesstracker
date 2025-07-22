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

export const getFoodItemById: RequestHandler<IdParam> = async (
  req,
  res,
  next
) => {
  const fdcId = parseInt(req.params.id);
  try {
    if (FDC_API_BASE_URL === undefined || FDC_API_KEY === undefined) {
      throw Error;
    }

    if (fdcId === undefined) {
      throw Error;
    }

    const foodItemExistsInDB = await foodItemRepo.exists({
      where: {
        fdcId,
      },
    });

    if (foodItemExistsInDB) {
      const foodItem = await foodItemRepo.findOneBy({ fdcId });
      res.status(200).send(foodItem);
    } else {
      interface UsdaByFdcIdResponse {
        fdcId: number;
        gtinUpc: string;
        description: string;
        publicationDate: string;
        foodClass: string;
        brandOwner?: string;
        brandName?: string;
        foodCategory?: string;
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

      const response = await fetch(
        `${FDC_API_BASE_URL}/food/${fdcId}?api_key=${FDC_API_KEY}`
      );

      const data = (await response.json()) as UsdaByFdcIdResponse;

      // parse nutrient data

      //used for parsing api response, matches codes from usda
      enum nutrientCodes {
        protein = "203",
        fat = "204",
        carbs = "205",
        kcal = "208",
      }

      const nutrients: NutrientsType = {
        calories: { per100g: 0 },
        protein: { per100g: 0 },
        carbs: { per100g: 0 },
        fat: { per100g: 0 },
      };

      //macro parsing, foods may have 1 or 2 objects labelNutrients and/or foodNutrients

      //per serving
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
            case nutrientCodes.kcal:
              nutrients.calories.per100g = record.amount;
              break;
            case nutrientCodes.protein:
              nutrients.protein.per100g = record.amount;
              break;
            case nutrientCodes.carbs:
              nutrients.carbs.per100g = record.amount;
              break;
            case nutrientCodes.fat:
              nutrients.fat.per100g = record.amount;
              break;
          }
        }
      }

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

      const newFoodItemData: FoodItemType = {
        fdcId: data.fdcId,
        gtinUpc: data.gtinUpc,
        publicationDate: new Date(data.publicationDate),
        lastCheckForUpdate: new Date(),
        brandOwner: data?.brandOwner || undefined,
        brandName: data?.brandName || undefined,
        foodCategory:
          data.foodCategory || data.brandedFoodCategory || "Uncategorized",
        foodClass: data.foodClass,
        description: data.description,
        packageWeight: data?.packageWeight || "",
        nutrients,
        foodPortions,
      };

      const newFoodItemInstance = foodItemRepo.create(newFoodItemData);

      const newFoodItem = await foodItemRepo.save(newFoodItemInstance);

      res.status(200).json(newFoodItem);
    }
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
