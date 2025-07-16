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
      interface ApiResponse {
        fdcId: number;
        gtinUpc: string;
        description: string;
        publicationDate: string;
        foodClass: string;
        brandOwner?: string;
        brandName?: string;
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
      }

      const response = await fetch(
        `${FDC_API_BASE_URL}/food/${fdcId}?api_key=${FDC_API_KEY}`
      );

      const data = (await response.json()) as ApiResponse;

      // parse nutrient data

      //used for parsing api response, matches codes from usda
      enum nutrientCodes {
        protein = "203",
        fat = "204",
        carbs = "205",
        kcal = "208",
      }

      //for non branded items, macros are per 100g
      const nutrients: NutrientsType = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };

      for (const record of data.foodNutrients) {
        switch (record.nutrient.number) {
          case nutrientCodes.kcal:
            nutrients.calories = record.amount;
            break;
          case nutrientCodes.protein:
            nutrients.protein = record.amount;
            break;
          case nutrientCodes.carbs:
            nutrients.carbs = record.amount;
            break;
          case nutrientCodes.fat:
            nutrients.fat = record.amount;
            break;
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
        gtinUpc: data?.gtinUpc,
        publicationDate: new Date(data.publicationDate),
        lastCheckForUpdate: new Date(),
        brandOwner: data?.brandOwner || undefined,
        brandName: data?.brandName || undefined,
        foodClass: data.foodClass,
        description: data.description,
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
  pageSize?: string;
  pageNumber?: string;
};

export const searchFoodItems: RequestHandler<
  unknown,
  unknown,
  unknown,
  SearchQuery
> = async (req, res, next) => {
  try {
    const { query, pageSize, pageNumber } = req.query;

    const params = new URLSearchParams();
    params.append("query", query);
    params.append("pageSize", String(pageSize));
    params.append("pageNumber", String(pageNumber));

    const response = await fetch(
      `${FDC_API_BASE_URL}/foods/search?api_key=${FDC_API_KEY}&${String(
        params
      )}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
