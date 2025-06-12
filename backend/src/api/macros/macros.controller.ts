import type { RequestHandler } from "express";
import type { LogMacrosBody } from "../api.types.js";
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
