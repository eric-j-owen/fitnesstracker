import type { RequestHandler } from "express";
import AppDataSource from "../../db/data-source.js";
import { Metric } from "../../db/entities/metric.entity.js";
import type { LogMetric } from "../api.types.js";

const metricsRepo = AppDataSource.getRepository(Metric);

export const getMetrics: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const result = await metricsRepo
      .createQueryBuilder("metrics")
      .where("metrics.userId = :userId", { userId })
      .orderBy("metrics.date", "ASC")
      .getMany();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const logMetrics: RequestHandler<unknown, unknown, LogMetric> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const { type, val, date } = req.body;
  console.log(date);
  try {
    const result = await metricsRepo
      .createQueryBuilder()
      .insert()
      .into("metrics")
      .values({
        userId,
        type,
        val,
        date: date,
      })
      .orUpdate(["val"], ["user_id", "type", "date"])
      .execute();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
