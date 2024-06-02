/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSoureces } from "../intarface/error";
import config from "../config";
import hendelzodError from "../errors/hendelZoderrors";
import hendelMongooseValidationError from "../errors/hendelMongooseError";
import hendelCastError from "../errors/hendelCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const globalErrorhendel: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something is wrong";
  let errorSources: TErrorSoureces = [
    {
      path: "",
      message: "something is wrong",
    },
  ];
  if (err instanceof ZodError) {
    const simplifliedError = hendelzodError(err);
    statusCode = simplifliedError?.statusCode;
    message = simplifliedError?.message;
    errorSources = simplifliedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifliedError = hendelMongooseValidationError(err);
    statusCode = simplifliedError?.statusCode;
    message = simplifliedError?.message;
    errorSources = simplifliedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifliedError = hendelCastError(err);
    statusCode = simplifliedError.statusCode;
    message = simplifliedError.message;
    errorSources = simplifliedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifliedError = handleDuplicateError(err);
    statusCode = simplifliedError.statusCode;
    message = simplifliedError.message;
    errorSources = simplifliedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,

    stack: config.NODE_ENV === "devlopment" ? err?.stack : null,
  });
};
export default globalErrorhendel;
