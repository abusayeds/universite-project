// import { TStudent } from "./student-interface";
import mongoose from "mongoose";
import { Student } from "./student-model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { UserModel } from "../user/user-model";
import { TStudent } from "./student-interface";


const getAllStudentDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path : "academicDepartment",
    populate: {
        path:'academicfaculty'
    }
  });
  return result;
};

const getSingleStudentDB = async (id: string) => {
  const result = await Student.findOne( {id} ).populate('admissionSemester').populate({
    path : "academicDepartment",
    populate: {
        path:'academicfaculty'
    }
  });

  return result;
};
const updateStudentDB = async (id: string,payload:Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate( ({id}),payload )
return result;
};
const deleteStudentDB = async (id: string) => {
    const session = await mongoose.startSession()
    try{
     session.startTransaction()
     const deleteStudentDB = await Student.findOneAndDelete(
        { id },{ session});
     if (!deleteStudentDB) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
      }
      const deleteUserDB = await UserModel.findOneAndDelete(
        { id },{ session})
        if (!deleteUserDB) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
          }

          await session.commitTransaction()
          await session.endSession()
     return deleteStudentDB;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student');
      }
};
export const studentSerise = {
//   createStudentDB,
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB ,
  updateStudentDB
};
