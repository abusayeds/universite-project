// import { TStudent } from "./student-interface";
import mongoose from "mongoose";
import { Student } from "./student-model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { UserModel } from "../user/user-model";
import { TStudent } from "./student-interface";


const getAllStudentDB = async (query: Record<string, unknown>) => {
  const studentSearchableField = ["email", "name.fristName", "presentAddress"];
  const copyQuair = { ...query };

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  const excludeField = ["searchTerm", "sort", "limit", "page" ,"fields"];

  excludeField.forEach((el) => delete copyQuair[el]);

  console.log({ query }, { copyQuair });
  const fillterQueruy = searchQuery
    .find(copyQuair)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicfaculty",
      },
    });
  let sort = "-createAt";
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = fillterQueruy.sort(sort);
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);
  let fields = "-__v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
    console.log(fields);
  }
  const fieldQuery = await limitQuery.select(fields)
  return fieldQuery;
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
