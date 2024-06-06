/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFaculty } from "./faculty-intarface";
import { facultyModel } from "./faculty-model";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { UserModel } from "../user/user-model";

const getAllFacultyDB = async () => {
  const result = await facultyModel.find().populate("academicDepartment");
  return result;
};

const getSingleFacultyDB = async (id: string) => {
  const result = await facultyModel.findById(id);
  return result;
};
//update data
const updateFacultyDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;
  const modifieldFacultyUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifieldFacultyUpdateData[`name.${key}`] = value;
    }
  }
  const result = await facultyModel.findByIdAndUpdate(
    id,
    modifieldFacultyUpdateData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteFacultyDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteFaculty = await facultyModel.findByIdAndDelete(id, { session });

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete faculty");
    }
    const userId = deleteFaculty.user;

    const deleteUser = await UserModel.findByIdAndDelete(userId, { session });
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const facultyServise = {
  getAllFacultyDB,
  getSingleFacultyDB,
  updateFacultyDB,
  deleteFacultyDB,
};
