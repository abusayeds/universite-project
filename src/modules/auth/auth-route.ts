import express from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { AuthValidation } from "./auth-validation";
import { AuthController } from "./auth-controller";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../user/user-constants";

const router = express.Router();

router.post(
  "/login",
  requestValidation(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);
router.post(
  "/change-password",
  auth( USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  requestValidation(AuthValidation.changePaswordValidationSchema),
  AuthController.changePassword
);

export const AuthRouter = router;
