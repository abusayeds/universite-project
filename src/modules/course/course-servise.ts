import QueryBuilder from "../../app/builder/QueryBuilder";
import { CourseSearchableFields } from "./course-constant";
import { TCourse, TCourseFaculty } from "./course-intarface";
import { CourseFacultyModel, CourseModel } from "./course-model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const createCourseDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoueseDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .fillter()
    .sort()
    .pagenate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course"
  );

  return result;
};

const updateCourseDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      remainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletePreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletePreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!deletePreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
      }
      const newpreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );
      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newpreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await CourseModel.findById(id).populate(
      "preRequisiteCourses.course"
    );
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }
};

const deleteCourseDB = async (id: string) => {
  const result = await CourseModel.findByIdAndDelete(id);
  return result;
};
const assignFacultiesWithCourseDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
        $pull: {facultise: {$in: payload}}
    },
    {
      new: true,
    }
  );
  return result;
};
const deleteFacultiesWithCourseDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { facultise: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};
export const CourseServise = {
  createCourseDB,
  getAllCoueseDB,
  getSingleCourseDB,
  deleteCourseDB,
  updateCourseDB,
  assignFacultiesWithCourseDB,
  deleteFacultiesWithCourseDB
};
