import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import type { UpdateUserBody, UserRequestParams } from "./user.schemas.js";
import createHttpError from "http-errors";

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

  const body = req.body;
  const keys = Object.keys(body);
  const values = Object.values(body);

  const idPosition = values.length + 1;
  const setFields = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");

  const q = `update users set ${setFields}, updated_at=current_timestamp where id=$${idPosition} returning id;`;
  try {
    const { rows } = await query(q, [...values, id]);
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};
