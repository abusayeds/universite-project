import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { AuthServise } from "./auth-servise";
import sentResponse from "../../app/middlwares/ResponseHandel";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServise.loginUserDB(req.body);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...paswordData } = req.body;

const result = await AuthServise.changePasswordDB(req.user, paswordData);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "password is update successfully",
    data: result,
  });
});  

export const AuthController = {
  loginUser,
  changePassword,
};
