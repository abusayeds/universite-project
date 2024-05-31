/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

const globalErrorhendel = (err : any , req:Request , res:Response, next:NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'spmething is wrong';
    return res.status(statusCode).json({
        success : false,
        message,
        error:err
    })
}
export default globalErrorhendel