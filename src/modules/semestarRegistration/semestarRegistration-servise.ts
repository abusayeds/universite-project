import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { TSemesterRegistration } from "./semestarRegistration-intarface";
import { academicSemestarModel } from "../academicSemester/academic-semister-model";
import { SemesterRegistrationModel } from "./semestarRegistration-model";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { RegistrationStatus } from "./semestarRegistration-constants";

const createSemestarRegistationDB = async (payload: TSemesterRegistration) => {
  const findAcademicSemistarId = payload.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`
    );
  }
  const findAcademicSemistar = await academicSemestarModel.findById(
    findAcademicSemistarId
  );
  if (!findAcademicSemistar) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semestar not Found !");
  }
  const isAcademicSemestarExist = await SemesterRegistrationModel.findOne({
    academicSemester: findAcademicSemistarId,
  });

  if (isAcademicSemestarExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Academic Semestar is alredy exist ! "
    );
  }
  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
const allSemestarRegistationDB = async (query: Record<string, unknown>) => {
  const semestarRegistationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate("academicSemester"),
    query
  )
    .fillter()
    .sort()
    .pagenate()
    .fields();
  const result = await semestarRegistationQuery.modelQuery;
  return result;
};
const singleSemestarRegistationDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  console.log(result);

  return result;
};

const updateSemestarRegistationDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(id);
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
 
  
  const requestStatus = payload?.status;
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Registsion semestar not Found !");
  }
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This semester is already ${isSemesterRegistrationExists.status}`
    );
  }
  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestStatus}`
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestStatus}`
    );
  }
  const result = await SemesterRegistrationModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemestarRegistationServise = {
  createSemestarRegistationDB,
  allSemestarRegistationDB,
  singleSemestarRegistationDB,
  updateSemestarRegistationDB,
};
