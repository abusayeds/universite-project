import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { SemesterRegistrationModel } from "../semestarRegistration/semestarRegistration-model";
import { TOfferedCourse } from "./offeredCourse-intarface";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty-model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment-Model";
import { CourseModel } from "../course/course-model";
import { facultyModel } from "../faculty/faculty-model";
import { offeredCourseModel } from "./offeredCourse-model";
import { hasTimeConflict } from "./offeredCourse-utils";

const createOfferedCourseDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  console.log(academicFaculty, academicDepartment);

  const isSemrstarRegidtaionExist =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemrstarRegidtaionExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semestarregistration not found !"
    );
  }
  const academicSemester = isSemrstarRegidtaionExist.academicSemester;
  const isAcademicFacultyExist =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, " Academic faculty not found !");
  }
  const isCourseExist = await CourseModel.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, " Academic faculty not found !");
  }
  const isFacultyExist = await facultyModel.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, " Academic faculty not found !");
  }
  const isAcademicDepartmentExist =
    await AcademicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, " Academic faculty not found !");
  }
  if (!isAcademicDepartmentExist?.academicfaculty.equals(academicFaculty)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this ${isAcademicDepartmentExist.name} is not belong to this ${isAcademicFacultyExist.name}`
    );
  }
  const isSameCourseAndSameSectionAndSameREgistation =
    await offeredCourseModel.findOne({
      semesterRegistration,
      section,
      course,
    });
  if (isSameCourseAndSameSectionAndSameREgistation) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Offered course with same section not allow ! Change section"
    );
  }
  const assignedScheduls = await offeredCourseModel
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select("days startTime endTime");
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedScheduls, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }
  const result = await offeredCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};
const updateOfferedCourseDB = async (
  id: string,
  paload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = paload;

  const isOfferedCourseExists = await offeredCourseModel.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !");
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semestarRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (semestarRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.NOT_FOUND,

      `You can not update this offered course as it is ${semestarRegistrationStatus?.status}`
    );
  }
  const isFacultyExists = await facultyModel.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Facul not found !");
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await offeredCourseModel
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select("days startTime endTime");
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }
  const result = await offeredCourseModel.findByIdAndUpdate(id, paload);
  return result;
};
export const offeredCourseServise = {
  createOfferedCourseDB,
  updateOfferedCourseDB,
};
