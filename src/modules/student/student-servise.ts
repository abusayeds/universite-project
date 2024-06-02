// import { TStudent } from "./student-interface";
import mongoose from "mongoose";
import { Student } from "./student-model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { UserModel } from "../user/user-model";
import { TStudent } from "./student-interface";

const getAllStudentDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicfaculty",
      },
    });
  return result;
};

const getSingleStudentDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicfaculty",
      },
    });

  return result;
};
const updateStudentDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifieldUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifieldUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifieldUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifieldUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifieldUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudentDB = await Student.findOneAndDelete({ id }, { session });
    if (!deleteStudentDB) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    const deleteUserDB = await UserModel.findOneAndDelete({ id }, { session });
    if (!deleteUserDB) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudentDB;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
  }
};
export const studentSerise = {
  //   createStudentDB,
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB,
  updateStudentDB,
};
