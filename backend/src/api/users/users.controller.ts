import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import type { UpdateUserBody, UserRequestParams } from "./users.schemas.js";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const { rows } = await query("select * from users;");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ err });
  }
};

export const getUser: RequestHandler<UserRequestParams> = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await query("select * from users where id = $1;", [id]);
    if (rows.length) res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ err });
  }
};

export const deleteUser: RequestHandler<UserRequestParams> = async (
  req,
  res
) => {
  const { id } = req.params;
  try {
    await query("delete from users where id = $1", [id]);
    res.status(204).json({ msg: "record deleted " });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ err });
  }
};

export const updateUser: RequestHandler<
  UserRequestParams,
  unknown,
  UpdateUserBody,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const keys = Object.keys(body);
  const values = Object.values(body);
  const idPosition = values.length + 1;
  const setFields = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");
  const q = `update users set ${setFields}, updated_at=current_timestamp where id=$${idPosition} returning *;`;
  try {
    const { rows } = await query(q, [...values, id]);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ err });
  }
};

// export const createUser: RequestHandler = async (req, res) => {};

// export const login: RequestHandler = async (req, res) => {};

// export const logout: RequestHandler = async (req, res) => {};
