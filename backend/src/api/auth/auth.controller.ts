import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import type {
  RegisterUserBody,
  LoginUserBody,
  User,
} from "../users/user.schemas.js";
import createHttpError from "http-errors";
import argon2 from "argon2";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

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

    const user: User = rows[0];
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) return next(err);
        res.status(200).json(user.id);
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

    const user: User = rows[0];
    if (!user) throw createHttpError(401, "invalid credentials");

    const isValid = await argon2.verify(user.password_hash, passwordRaw);

    if (isValid && user.email) {
      req.session.regenerate((err) => {
        if (err) return next(err);
        req.session.userId = user.id;

        req.session.save((err) => {
          if (err) return next(err);
          res.status(200).json(user.id);
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

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  if (!req.session.userId) {
    throw createHttpError(401, "Unauthorized");
  }

  try {
    const { rows } = await query(
      `select id, first_name, email from users where id = $1`,
      [req.session.userId]
    );

    const parsedUser = rows[0];

    if (!parsedUser) {
      throw createHttpError(401, "Unauthorized");
    }

    res.status(200).json(parsedUser);
  } catch (error) {
    next(error);
  }
};
