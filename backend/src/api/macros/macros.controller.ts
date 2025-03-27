import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import createHttpError from "http-errors";
import type { LogMacrosBodyType } from "./macros.routes.js";

export const getMacrosLogs: RequestHandler = async (req, res, next) => {
  const id = req.session.userId;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const { rows } = await query(
      `
        select * from macros 
        where user_id = $1 
        order by date desc 
        limit $2 offset $3;`,
      [id, limit, offset]
    );

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const logMacros: RequestHandler<
  unknown,
  unknown,
  LogMacrosBodyType
> = async (req, res, next) => {
  const id = req.session.userId;
  const { calories, protein, carbs, fats, date } = req.body;

  try {
    const { rows } = await query(
      `
        insert into macros 
            (user_id, calories, protein, carbs, fats, date) 
        values ($1, $2, $3, $4, $5, $6)
        on conflict (user_id, date) 
        do update set 
            calories = excluded.calories,
            protein = excluded.protein,
            carbs = excluded.carbs,
            fats = excluded.fats 
        returning *;`,
      [id, calories, protein, carbs, fats, date]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
