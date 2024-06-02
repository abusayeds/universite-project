import mongoose from "mongoose";
import { TGenericErrorResponse } from "../intarface/error";

const hendelMongooseValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return{
            path: val?.path,
            message : val?.message
        }
    }
  );
  const statusCode = 400; 
  return{
    statusCode,
    message : 'Mongoose validation error ',
    errorSources
  }
};

export default hendelMongooseValidationError;
