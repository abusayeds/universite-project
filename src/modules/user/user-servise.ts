/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import config from "../../app/config";
import { academicSemestarModel } from "../academicSemester/academic-semister-model";
import { TStudent } from "../student/student-interface";
import { Student } from "../student/student-model";
import { Tuser } from "./user-interface";
import { UserModel } from "./user-model";
import { generateFacultyId, generateStudentId } from "./user-utilis";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty-intarface";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment-Model";
import { facultyModel } from "../faculty/faculty-model";

const createStudentDB = async (password: string, payload: TStudent) => {
  const userData: Partial<Tuser> = {};
  userData.password = password || config.defoult_pasword;
  userData.role = "student";
  const admissionSemister = await academicSemestarModel.findById(
    payload.admissionSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemister);
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "faild to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "faild to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Student creating faild");
  }
};
//create faculty
const crateFacultyDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<Tuser> = {};
  userData.password = password || config.defoult_pasword;
  userData.role = "faculty";
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(400, "Academic department not fount");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Field to create user ");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newFaculty = await facultyModel.create([payload], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Field to create Faculty ");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServise = {
  createStudentDB,
  crateFacultyDB,
};
