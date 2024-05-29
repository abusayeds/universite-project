
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { acadamicSemesterServise } from "../academicSemester/academic-semister-servise";

const createAcadamicFaculty= catchAsync (async (req, res,) => {
     const result = await acadamicSemesterServise.createAcadamicSemestaeServiseDB(req.body);
     sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " creat acadamic semester succesfully ",
      data: result,
    })
});

const getaAllAcadamicFaculty = catchAsync(async(req, res) => {
    const result = await acadamicSemesterServise.getaAllAcademicSemestarDB()
    sentResponse(res ,{
        statusCode: httpStatus.OK,
        success: true,
        message: " Get All Acadamic Faculty Succesfully ",
        data: result,
    })
})

const getSingleAcadamicFaculty = catchAsync (async (req, res) => {
    const {facultyId} = req.params
    const result = await acadamicSemesterServise.getSingleAcademicSemester(facultyId)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: " Get Single Acadamic Faculty Succesfully ",
        data: result,
    })
}) 

const UpdateAcademicFaculty = catchAsync(async(req, res) => {
    const {facultyId} = req.params
    const result = await acadamicSemesterServise.UpdateAcadamicSemesterDB(facultyId, req.body)
    sentResponse(res , {
        statusCode: httpStatus.OK,
        success: true,
        message: " Update  Acadamic Faculty Succesfully ",
        data: result,
    })
})


export const acadamicSemeterController = {
  createAcadamicFaculty,
  getaAllAcadamicFaculty,
  getSingleAcadamicFaculty,
  UpdateAcademicFaculty
};
