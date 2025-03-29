import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import createHttpError from "http-errors";
import type { LogMetricSchema } from "./metrics.routes.js";

export const getMetrics: RequestHandler = async (req, res, next) => {
  const id = req.session.userId;

  try {
    const { rows } = await query(
      `
        select * from (
            select * from metrics 
            where user_id = $1 
            order by date desc 
            limit 5
          ) as recent_metrics
        order by date asc;`,
      [id]
    );

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const logMetrics: RequestHandler<
  unknown,
  unknown,
  LogMetricSchema
> = async (req, res, next) => {
  const id = req.session.userId;
  const { type, val, date } = req.body;

  try {
    const { rows } = await query(
      `
        insert into metrics (user_id, type, val, date) 
        values ($1, $2, $3, $4)
        on conflict (user_id, type, date) 
        do update set 
            val = excluded.val
        returning *;`,
      [id, type, val, date]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
