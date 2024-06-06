

import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { CourseServise } from "./course-servise";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServise.createCourseDB(req.body);
  
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is created succesfully',
      data: result,
    });
  });
  const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServise.getAllCoueseDB(req.query);
  
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course are retrieved successfully',
      data: result,
    });
  });
  
const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServise.getSingleCourseDB(id);
  
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is retrieved succesfully',
      data: result,
    });
  });

  
const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServise.updateCourseDB(id, req.body)
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'course is updated succesfully',
      data: result,
    });
  });
  const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServise.deleteCourseDB(id);
  
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is deleted succesfully',
      data: result,
    });
  });
  const CourseFacultyUpdate = catchAsync(async(req, res ) => {
    const {courseId} = req.params
    const id = courseId.trim();
    const {facultise} = req.body
    const result = await CourseServise.assignFacultiesWithCourseDB(id,facultise)
    
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facultise assigned succesfully',
        data: result,
      });
   })
  const deleteCourseFaculty= catchAsync(async(req, res ) => {
    const {courseId} = req.params
    const id = courseId.trim();
    const {facultise} = req.body
    const result = await CourseServise.assignFacultiesWithCourseDB(id,facultise)
    
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facultise Remove succesfully',
        data: result,
      });
   })

  export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    CourseFacultyUpdate,
    deleteCourseFaculty
  }