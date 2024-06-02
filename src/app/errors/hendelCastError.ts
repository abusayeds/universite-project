import mongoose from "mongoose";
import { TErrorSoureces, TGenericErrorResponse } from "../intarface/error";

const hendelCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSoureces = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID  ",
    errorSources,
  };
};
export default hendelCastError;
