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

export const getFoodItem: RequestHandler<IdParam> = async (req, res, next) => {
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

      const json = (await response.json()) as ApiResponse;

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

      for (const record of json.foodNutrients) {
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
      if (json.foodClass === "Branded") {
        foodPortions.push({
          portionDescription: json.householdServingFullText,
          servingSize: json.servingSize,
          servingSizeUnit: json.servingSizeUnit,
        });
      } else if (json.foodPortions) {
        for (const portion of json.foodPortions) {
          foodPortions.push({
            portionDescription: portion.portionDescription,
            gramWeight: portion.gramWeight,
            amount: portion?.amount,
          });
        }
      }

      const newFoodItemData: FoodItemType = {
        fdcId: json.fdcId,
        gtinUpc: json?.gtinUpc,
        publicationDate: new Date(json.publicationDate),
        lastCheckForUpdate: new Date(),
        brandOwner: json?.brandOwner || undefined,
        brandName: json?.brandName || undefined,
        foodClass: json.foodClass,
        description: json.description,
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
