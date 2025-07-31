import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import { FoodLog, MealCategory } from "../../db/entities/foodLog.entity.js";
import type { FoodLogReqBody, IdParam } from "../api.types.js";
import createHttpError from "http-errors";

const foodLogRepo = AppDataSource.getRepository(FoodLog);
const foodItemRepo = AppDataSource.getRepository(FoodItem);

export const getLogEntry: RequestHandler = async (req, res, next) => {};
export const getLoggedDay: RequestHandler = async (req, res, next) => {};
export const deleteLogEntry: RequestHandler = async (req, res, next) => {};
export const editLogEntry: RequestHandler = async (req, res, next) => {};

export const createLogEntry: RequestHandler<
  IdParam,
  unknown,
  FoodLogReqBody,
  unknown
> = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const {
      foodItemId,
      mealCategory,
      amount,
      unit,
      logDate,
      calculatedCalories,
      calculatedProtein,
      calculatedCarbs,
      calculatedFat,
    } = req.body;

    const foodItem = await foodItemRepo.findOneBy({ id: foodItemId });
    if (!foodItem) {
      throw createHttpError(404, "Not found.");
    }

    const logEntry = foodLogRepo.create({
      user: { id: userId },
      foodItem: { id: foodItemId },
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
