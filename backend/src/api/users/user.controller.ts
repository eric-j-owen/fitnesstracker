import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import type {
  RegisterUserBody,
  UpdateUserBody,
  UserRequestParams,
  LoginUserBody,
  User,
} from "./user.schemas.js";
import createHttpError from "http-errors";
import argon2 from "argon2";

const DUMMY_HASH = await argon2.hash("dummy password");

declare module "express-session" {
  interface SessionData {
    userId?: number;
    isAuthenticated?: boolean;
  }
}

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { rows } = await query("select * from users;");
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
    const { rows } = await query("select * from users where id = $1;", [id]);

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

  const q = `update users set ${setFields}, updated_at=current_timestamp where id=$${idPosition} returning *;`;
  try {
    const { rows } = await query(q, [...values, id]);
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const registerUser: RequestHandler<
  unknown,
  unknown,
  RegisterUserBody
> = async (req, res, next) => {
  const { firstName, email, passwordRaw } = req.body;

  try {
    const hash = await argon2.hash(passwordRaw);
    const { rows } = await query(
      `
      insert into users(first_name, email, password_hash)
      values($1, $2, $3)
      returning id;  
    `,
      [firstName, email, hash]
    );

    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = rows[0].id;
      req.session.isAuthenticated = true;
      req.session.save((err) => {
        if (err) return next(err);
        res.status(200).json(rows[0]);
      });
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler<
  unknown,
  unknown,
  LoginUserBody
> = async (req, res, next) => {
  const { email, passwordRaw } = req.body;

  try {
    const { rows } = await query(
      `
      select id, email, first_name, password_hash from users where email = $1
      `,
      [email]
    );

    const user: User = rows[0] || { password_hash: DUMMY_HASH };
    const isValid = await argon2.verify(user.password_hash, passwordRaw);

    if (isValid && user.email) {
      req.session.regenerate((err) => {
        if (err) return next(err);
        req.session.userId = user.id;
        req.session.isAuthenticated = true;

        req.session.save((err) => {
          if (err) return next(err);
          res.status(200).json(`Success`);
        });
      });
    } else {
      throw createHttpError(401, "invalid credentials");
    }
  } catch (err) {
    next(err);
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.clearCookie("connect.sid");
      res.status(200).json({ msg: "logout successful" });
    }
  });
};
