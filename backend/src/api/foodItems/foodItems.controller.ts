import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import type { FoodPortions, IdParam } from "../api.types.js";

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
      //used for parsing api response, matches codes from usda
      enum nutrientCodes {
        protein = "203",
        fat = "204",
        carbs = "205",
        kcal = "208",
      }

      interface ApiResponse {
        fdcId: number;
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
      let calories, protein, carbs, fat;
      for (const record of json.foodNutrients) {
        switch (record.nutrient.number) {
          case nutrientCodes.kcal:
            calories = record.amount;
            break;
          case nutrientCodes.protein:
            protein = record.amount;
            break;
          case nutrientCodes.carbs:
            carbs = record.amount;
            break;
          case nutrientCodes.fat:
            fat = record.amount;
            break;
        }
      }

      // parse food portion data
      let servingSize,
        foodPortions: FoodPortions = [];
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
            servingSize: portion.gramWeight,
            modifier: portion?.modifier,
            amount: portion?.amount,
          });
        }
      }

      const newFoodItem = {
        fdcId: json.fdcId,
        publicationDate: new Date(json.publicationDate),
        brandOwner: json?.brandOwner || null,
        brandName: json?.brandName || null,
        foodClass: json.foodClass,
        description: json.description,
        calories,
        protein,
        carbs,
        fat,
        foodPortions,
      };

      //   foodItemRepo.create({});
      //   foodItemRepo.save({});
      res.status(200).json(newFoodItem);
    }
  } catch (error) {
    next(error);
  }
};
