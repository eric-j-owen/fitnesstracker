import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { FoodItem } from "../../db/entities/foodItem.entity.js";
import { FoodLog } from "../../db/entities/foodLog.entity.js";

const foodLogRepo = AppDataSource.getRepository(FoodLog);
const foodItemRepo = AppDataSource.getRepository(FoodItem);

export const createLogEntry: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;
  const { fdcId } = req.body;

  try {
  } catch (err) {
    next(err);
  }
  const foodItem = await foodItemRepo.findOneBy({});
};
