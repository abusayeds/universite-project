
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { AcademicFacultyServise } from "./academicFaculty-servise";

const createAcadamicFaculty= catchAsync (async (req, res,) => {
     const result = await AcademicFacultyServise.createAcamdmicFacultyServiseDB(req.body);
     sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " creat acadamic semester succesfully ",
      data: result,
    })
});

const getaAllAcadamicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServise.getAcamdmicFacultyServiseDB()
    sentResponse(res ,{
        statusCode: httpStatus.OK,
        success: true,
        message: " Get All Acadamic Faculty Succesfully ",
        data: result,
    })
})

const getSingleAcadamicFaculty = catchAsync (async (req, res) => {
    const {facultyId} = req.params
    
    
    const result = await AcademicFacultyServise.getSingleAcamdmicFacultyServiseDB(facultyId)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: " Get Single Acadamic Faculty Succesfully ",
        data: result,
    })
}) 

const UpdateAcademicFaculty = catchAsync(async(req, res) => {
    const {facultyId} = req.params
    const result = await AcademicFacultyServise.updateAcamdmicFacultyServiseDB(facultyId, req.body)
    sentResponse(res , {
        statusCode: httpStatus.OK,
        success: true,
        message: " Update  Acadamic Faculty Succesfully ",
        data: result,
    })
})


export const acadamicFacultyController = {
  createAcadamicFaculty,
  getaAllAcadamicFaculty,
  getSingleAcadamicFaculty,
  UpdateAcademicFaculty
};
