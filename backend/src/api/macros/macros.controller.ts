import type { RequestHandler } from "express";
import type { LogMacrosBody } from "../api.types.js";
import AppDataSource from "../../db/data-source.js";
import { FoodLog } from "../../db/entities/foodLog.entity.js";

const foodLogRepo = AppDataSource.getRepository(FoodLog);

export const getDailyMacros: RequestHandler = async (req, res, next) => {
  try {
    // const userId = req.session.userId;
    const userId = 2;
    const date = String(req.query.date).split("T")[0];

    const result = await foodLogRepo
      .createQueryBuilder("totals")
      .select([
        "SUM(totals.calculatedCalories) AS calories",
        "SUM(totals.calculatedProtein) AS protein",
        "SUM(totals.calculatedCarbs) AS carbs",
        "SUM(totals.calculatedFat) AS fat",
      ])
      .where("totals.user_id = :userId", { userId })
      .andWhere("totals.log_date = :date", { date })
      .getRawOne();

    res.status(200).json({
      date,
      calories: Number(result?.calories),
      protein: Number(result?.protein),
      carbs: Number(result?.carbs),
      fat: Number(result?.fat),
    });
  } catch (err) {
    next(err);
  }
};

export const getHistoricalMacros: RequestHandler = async (req, res, next) => {};
