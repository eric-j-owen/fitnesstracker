import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import { FoodLog, MealCategory } from "../../db/entities/foodLog.entity.js";
import type { FoodLogReqBody, IdParam } from "../api.types.js";
import createHttpError from "http-errors";

const foodLogRepo = AppDataSource.getRepository(FoodLog);
const foodItemRepo = AppDataSource.getRepository(FoodItem);

export const getLoggedDay: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const dateStr = String(req.query.date).split("T")[0];

    if (!dateStr) {
      throw createHttpError(400, "missing date");
    }
    const logs = await foodLogRepo.find({
      where: {
        user: { id: userId },
        logDate: dateStr,
      },
      relations: ["foodItem"],
    });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};

export const deleteLogEntry: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { id } = req.params;

    const result = await foodLogRepo.delete({
      id: Number(id),
      user: { id: userId },
    });

    if (result.affected === 0) {
      throw createHttpError(404, "entry not found");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const editLogEntry: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { id } = req.params;
    const {
      amount,
      unit,
      mealCategory,
      calculatedCalories,
      calculatedProtein,
      calculatedCarbs,
      calculatedFat,
    } = req.body;

    const result = await foodLogRepo.update(
      {
        user: { id: userId },
        id: Number(id),
      },
      {
        amount,
        unit,
        mealCategory,
        calculatedCalories,
        calculatedProtein,
        calculatedCarbs,
        calculatedFat,
      }
    );

    if (result.affected === 0) {
      throw createHttpError(404, "entry not found");
    }

    const updatedEntry = await foodLogRepo.findOneBy({ id: Number(id) });
    res.status(200).json(updatedEntry);
  } catch (error) {
    next(error);
  }
};

export const createLogEntry: RequestHandler<
  unknown,
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
      logDate: String(logDate).split("T")[0],
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
