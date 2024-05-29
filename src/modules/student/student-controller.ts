/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { studentSerise } from "./student-servise";
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";

const getAllStudents = catchAsync(async (req, res, ) => {
  const result = await studentSerise.getAllStudentDB();

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student get data  succesfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, ) => {
  const { studentID } = req.params;
  const result = await studentSerise.getSingleStudentDB(studentID);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get single student data  succesfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, ) => {
  const { studentID } = req.params;
  const result = await studentSerise.deleteStudentDB(studentID);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " succesfully deleted",
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
