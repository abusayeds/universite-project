import express from "express";
import { userController } from "./user-controller";
import { studentValidation } from "../student/student-validation";
import requestValidation from "../../app/middlwares/validation-request";

const router = express.Router();


router.post(
  "/create-student",
 requestValidation(studentValidation.createStudentValidationSchema),
  userController.createStudent
);
export const UserRoute = router;
