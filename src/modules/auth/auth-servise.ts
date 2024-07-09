import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { UserModel } from "../user/user-model";
import { TLoginUser } from "./auth-intarface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";
import bcrypt from "bcrypt";

const loginUserDB = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCustomId(payload.id);
  

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not Found !");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "This user is blocked !");
  }
  if (!(await UserModel?.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.NOT_FOUND, "password do not metched !");
  }
  //   create token
  const jwtPayload = {
    userID: user.id,
    role: user.role,
  };
  console.log(jwtPayload);

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  console.log(accessToken);

  return {
    accessToken,
    needsPasswoedChange: user?.needsPasswordChange,
  };
};
const changePasswordDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }

) => {
//    console.log(payload.oldPassword,payload.newPassword, userData.password);
   
  const user = await UserModel.isUserExistsByCustomId(userData.userID);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not Found !");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "This user is blocked !");
  }
//   i

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  await UserModel.findOneAndUpdate(
    {
      id: userData.userID,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    }
  );
  return null;
};

export const AuthServise = {
  loginUserDB,
  changePasswordDB,
};
