import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { facultyServise } from "./faculty-servise";

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyServise.getAllFacultyDB();
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get All  Faculty Succesfully ",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const id = Id.trim();
  const result = await facultyServise.getSingleFacultyDB(id);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get single Faculty Succesfully ",
    data: result,
  });
});
//updata
const updateFaculty = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const id = Id.trim();
  const { faculty } = req.body;
  const result = await facultyServise.updateFacultyDB(id, faculty);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Update Faculty Succesfully ",
    data: result,
  });
});
// delete Faculty
const deleteFaculty = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const id = Id.trim();
  const result = await facultyServise.deleteFacultyDB(id);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " delete Faculty Succesfully ",
    data: result,
  });
});
export const facultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
};
