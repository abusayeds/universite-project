/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { acadamicSemesterServise } from "./academic-semister-servise";

const createAcadamicSemester= catchAsync (async (req, res,) => {
     const result = await acadamicSemesterServise.createAcadamicSemestaeServiseDB(req.body);
     sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " creat acadamic semester succesfully ",
      data: result,
    })
});

const getaAllAcamicSemestar = catchAsync(async(req, res) => {
    const result = await acadamicSemesterServise.getaAllAcademicSemestarDB()
    sentResponse(res ,{
        statusCode: httpStatus.OK,
        success: true,
        message: " Get All Acadamic Semester Succesfully ",
        data: result,
    })
})

const getSingleAcademicSemestar = catchAsync (async (req, res) => {
    const {semesterId} = req.params
    const result = await acadamicSemesterServise.getSingleAcademicSemester(semesterId)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: " Get Single Acadamic Semester Succesfully ",
        data: result,
    })
}) 

const UpdateAcadamicSemester = catchAsync(async(req, res) => {
    const {semesterId} = req.params
    const result = await acadamicSemesterServise.UpdateAcadamicSemesterDB(semesterId, req.body)
    sentResponse(res , {
        statusCode: httpStatus.OK,
        success: true,
        message: " Update  Acadamic Semester Succesfully ",
        data: result,
    })
})


export const acadamicSemeterController = {
  createAcadamicSemester, 
  getaAllAcamicSemestar,
  getSingleAcademicSemestar,
  UpdateAcadamicSemester
};
