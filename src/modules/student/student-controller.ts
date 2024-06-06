/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { studentSerise } from "./student-servise";
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentSerise.getAllStudentDB(req.query);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student get data  succesfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { Id } = req.params;
    const id = Id.trim();
  const result = await studentSerise.getSingleStudentDB(id);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get single student data  succesfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
    const { Id } = req.params;
    const id = Id.trim();
  const result = await studentSerise.updateStudentDB(id, req.body);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " update student data  succesfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const id = Id.trim();
  const result = await studentSerise.deleteStudentDB(id);

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
  updateStudent,
};
