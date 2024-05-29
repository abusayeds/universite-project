/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { UserServise } from "./user-servise";
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";

const createStudent: RequestHandler = catchAsync (async (req, res,) => {
     
    const { password, student: studentData } = req.body;
    // const data = studentValidation.studentValidationSchema.parse(studentData)
    const result = await UserServise.createStudentDB(password,studentData);
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student creat succesfully ",
      data: result,
    })
});
export const userController = {
  createStudent, 
};
