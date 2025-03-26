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
    switch (error.code) {
      case "23505":
        response.status = 409;
        response.message = "Duplicate entry detected";
        break;
      case "23503":
        response.status = 404;
        response.message = "Related resource not found";
        break;
      default:
        response.status = 500;
        response.message = "Database operation failed";
    }
  } else if (error instanceof TypeError) {
    console.error(error);
    // response.status = error;
    response.message = error.message;
  }

  if (process.env.NODE_ENV === "development") {
    res.status(response.status).json({
      status: response.status,
      message: response.message,
      stack: error.stack,
      issues: response.issues,
    });
  }
};
