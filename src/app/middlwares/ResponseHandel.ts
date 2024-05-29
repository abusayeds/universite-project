import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};
const sentResponse = <T> (res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    sussess : data.success,
    message : data.message,
    data : data.data
  });
};
export default  sentResponse
