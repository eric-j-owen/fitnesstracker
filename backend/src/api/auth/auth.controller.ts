import createHttpError from "http-errors";
import argon2 from "argon2";
import { User } from "../../db/entities/user.entity.js";
import AppDataSource from "../../db/data-source.js";
import type { RequestHandler } from "express";
import type { RegisterUserBody, LoginUserBody } from "../../types/index.js";

const userRepo = AppDataSource.getRepository(User);

// extend Express session to include userId
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
  const { firstName, username, passwordRaw } = req.body;

  try {
    const hash = await argon2.hash(passwordRaw);
    const user = userRepo.create({
      firstName,
      username,
      passwordHash: hash,
    });

    const savedUser = await userRepo.save(user);

    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = savedUser.id;
      req.session.save((err) => {
        if (err) return next(err);
        res.status(200).json(savedUser.id);
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
  const { username, passwordRaw } = req.body;

  try {
    //find user by username
    const user = await userRepo.findOne({
      where: { username },
      select: ["id", "username", "firstName", "passwordHash"],
    });

    if (!user) {
      throw createHttpError(401, "invalid credentials");
    }

    //verify pass
    const isValid = await argon2.verify(user.passwordHash, passwordRaw);

    //create session
    if (isValid && user.username) {
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
    const user = await userRepo.findOne({
      where: { id: req.session.userId },
      select: [
        "id",
        "firstName",
        "lastName",
        "username",
        "targetProtein",
        "targetCarbs",
        "targetFats",
      ],
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
