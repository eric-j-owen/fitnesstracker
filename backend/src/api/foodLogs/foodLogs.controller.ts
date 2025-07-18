import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import { FoodLog, MealCategory } from "../../db/entities/foodLog.entity.js";
import type { FoodLogReqBody } from "../api.types.js";

const foodLogRepo = AppDataSource.getRepository(FoodLog);
const foodItemRepo = AppDataSource.getRepository(FoodItem);

export const getLogEntry: RequestHandler = async (req, res, next) => {};
export const getLoggedDay: RequestHandler = async (req, res, next) => {};
export const deleteLogEntry: RequestHandler = async (req, res, next) => {};
export const editLogEntry: RequestHandler = async (req, res, next) => {};

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

    const foodItem = await foodItemRepo.findOneBy({ fdcId });
    if (!foodItem) {
      return res.status(404).json({ message: "food item not found" });
    }

    const logEntry = foodLogRepo.create({
      user: { id: userId },
      foodItem,
      mealCategory: mealCategory as MealCategory,
      amount,
      unit,
      logDate: new Date(logDate),
      calculatedCalories,
      calculatedProtein,
      calculatedCarbs,
      calculatedFat,
    });

    const saved = await foodLogRepo.save(logEntry);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};
