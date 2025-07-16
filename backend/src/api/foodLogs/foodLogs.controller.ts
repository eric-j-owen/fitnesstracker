import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import { FoodLog } from "../../db/entities/foodLog.entity.js";
import type { FoodLogReqBody } from "../api.types.js";

const foodLogRepo = AppDataSource.getRepository(FoodLog);
const foodItemRepo = AppDataSource.getRepository(FoodItem);

export const getFoodLogEntry: RequestHandler = async (req, res, next) => {};
export const getFoodLogDay: RequestHandler = async (req, res, next) => {};

export const createLogEntry: RequestHandler<
  unknown,
  unknown,
  FoodLogReqBody,
  unknown
> = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const {
      fdcId,
      mealCategory,
      amount,
      unit,
      logDate,
      calculatedCalories,
      calculatedProtein,
      calculatedCarbs,
      calculatedFat,
    } = req.body;
  } catch (err) {
    next(err);
  }
  const foodItem = await foodItemRepo.findOneBy({});
};

export const editLogEntry: RequestHandler = async (req, res, next) => {};
