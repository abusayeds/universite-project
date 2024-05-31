
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { AcademicDepartmentServise } from "./academicDepartment-servise";

const createAcadamicDepartment= catchAsync (async (req, res,) => {
     const result = await AcademicDepartmentServise.createAcamdmicDepartmentServiseDB(req.body);
     sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " creat acadamic department succesfully ",
      data: result,
    })
});

const getaAllAcadamicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentServise.getAllAcamdmicDepartmentServiseDB()
    sentResponse(res ,{
        statusCode: httpStatus.OK,
        success: true,
        message: " Get All Acadamic department Succesfully ",
        data: result,
    })
})


const getSingleAcamdmicDepartment = catchAsync(async(req, res) => {
    const {departmentId} = req.params
    const trimmedDepartmentId = departmentId.trim();
    const result = await AcademicDepartmentServise.getSingleAcamdmicDepartmentServiseDB(trimmedDepartmentId)
    sentResponse(res ,{
        statusCode: httpStatus.OK,
        success: true,
        message: " Get single Acadamic department Succesfully ",
        data: result,
    })
})


const UpdateAcademicDepartment = catchAsync(async(req, res) => {
    const {departmentId} = req.params
    const result = await AcademicDepartmentServise.updateAcamdmicDepartmentServiseDB(departmentId, req.body)
    sentResponse(res , {
        statusCode: httpStatus.OK,
        success: true,
        message: " Update  Acadamic department Succesfully ",
        data: result,
    })
})


export const acadamicDepartmentController = {
  createAcadamicDepartment,
  getaAllAcadamicDepartment,
  getSingleAcamdmicDepartment,
  UpdateAcademicDepartment
};
