import type { RequestHandler } from "express";
import type { LogMacrosBody } from "../../schemas/api.types.js";
import AppDataSource from "../../db/data-source.js";
import { Macro } from "../../db/entities/macro.entity.js";

const macrosRepo = AppDataSource.getRepository(Macro);

export const getMacrosLogs: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const result = await macrosRepo
      .createQueryBuilder("macros")
      .where("macros.userId = :userId", { userId })
      .orderBy("macros.date", "ASC")
      .limit(5)
      .getMany();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const logMacros: RequestHandler<
  unknown,
  unknown,
  LogMacrosBody
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { calories, protein, carbs, fats, date } = req.body;

  try {
    const result = await macrosRepo
      .createQueryBuilder()
      .insert()
      .into("macros")
      .values({
        userId,
        calories,
        protein,
        carbs,
        fats,
        date: date,
      })
      .orUpdate(["calories", "protein", "carbs", "fats"], ["user_id", "date"])
      .execute();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
