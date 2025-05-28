import type { RequestHandler } from "express";
import type { IdParam, UpdateUserBody } from "../../types/index.js";
import createHttpError from "http-errors";
import AppDataSource from "../../db/data-source.js";
import { User } from "../../db/entities/user.entity.js";

const userRepo = AppDataSource.getRepository(User);

export const deleteUser: RequestHandler = async (req, res, next) => {
  const id = req.session.userId;
  try {
    const result = await userRepo.delete({ id });

    if (!result.affected) {
      throw createHttpError(404, "Not found.");
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler<
  IdParam,
  unknown,
  UpdateUserBody,
  unknown
> = async (req, res, next) => {
  const id = req.session.userId;

  try {
    const existingUser = await userRepo.findOne({ where: { id } });
    if (!existingUser) {
      throw createHttpError(404, "Not found.");
    }

    await userRepo.update(
      { id },
      {
        ...req.body,
        updatedAt: new Date(),
      }
    );

    const updatedUser = await userRepo.findOne({ where: { id } });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
