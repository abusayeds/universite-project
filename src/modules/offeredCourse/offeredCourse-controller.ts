import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { offeredCourseServise } from "./offeredCourse-servise";

const createofferedCourse = catchAsync(async(req, res) => {
const result = await offeredCourseServise.createOfferedCourseDB(req.body)
sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " create offered Course  Succesfully ",
    data: result,
  });
})

const updateferedCourse = catchAsync(async(req, res) => {
 const {id} =req.params  
 const result = await offeredCourseServise.updateOfferedCourseDB(id, req.body) 
sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get All  Faculty Succesfully ",
    data: result,
  });
})
 export const offeredCourseController = {
    createofferedCourse,
    updateferedCourse
}