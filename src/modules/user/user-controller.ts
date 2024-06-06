/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserServise } from "./user-servise";
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";

const createStudent = catchAsync (async (req, res,) => {
     
    const { password, student:studentData } = req.body;
    const result = await UserServise.createStudentDB(password,studentData);
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student creat succesfully ",
      data: result,
    })
});
const createFaculty = catchAsync( async (req, res) => {
    const {password , faculty: facultyData} = req.body
    const result = await UserServise.crateFacultyDB(password, facultyData)
    
    
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "  creat faculty succesfully ",
        data: result,
      })
})
export const userController = {
  createStudent, 
  createFaculty
};
