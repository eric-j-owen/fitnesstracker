import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import type { UpdateUserBody, UserRequestParams } from "./user.schemas.js";
import createHttpError from "http-errors";
import toSnakeCase from "../../utils/toSnakeCase.js";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { rows } = await query("select id, first_name from users;");
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler<UserRequestParams> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const { rows } = await query(
      "select id, first_name from users where id = $1;",
      [id]
    );

    if (rows.length) res.status(200).json(rows[0]);
    else throw createHttpError(404, "Not found.");
  } catch (err) {
    next(err);
  }
};

export const deleteUser: RequestHandler<UserRequestParams> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const { rows } = await query(
      "delete from users where id = $1 returning id",
      [id]
    );
    if (rows.length) res.sendStatus(204);
    else throw createHttpError(404, "Not found.");
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler<
  UserRequestParams,
  unknown,
  UpdateUserBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await query(`select id from users where id = $1`, [id]);
  if (!rows.length) throw createHttpError(404, "Not found.");

  const keys = toSnakeCase(Object.keys(req.body));
  const values = Object.values(req.body);

  const idPosition = values.length + 1;
  const setFields = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");

  const q = `update users set ${setFields}, updated_at=current_timestamp where id=$${idPosition} returning *;`;
  try {
    const { rows } = await query(q, [...values, id]);
    console.log(rows[0]);
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};
