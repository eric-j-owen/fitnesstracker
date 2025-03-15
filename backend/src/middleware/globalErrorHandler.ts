/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { isHttpError } from "http-errors";
import pkg from "pg";
const { DatabaseError } = pkg;

interface ErrorResponse {
  status: number;
  message: string;
  issues?: string[];
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const response: ErrorResponse = {
    status: 500,
    message: "An unknown error occured",
  };

  //api validation errors
  if (error instanceof ZodError) {
    response.status = 400;
    response.message = "Validation error";
    response.issues = error.errors.map((issue) => issue.message);
  }

  // errors from http-errors
  else if (isHttpError(error)) {
    response.status = error.status;
    response.message = error.message;
  }

  // db errors
  else if (error instanceof DatabaseError) {
    response.message = error.message;
  }

  if (process.env.NODE_ENV === "development") {
    console.error({
      status: response.status,
      message: response.message,
      stack: error.stack,
      ...error,
    });

    res.status(response.status).json({ ...response });
  }
};
