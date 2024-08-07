import express from "express";
import { userController } from "./user-controller";
import { studentValidation } from "../student/student-validation";
import requestValidation from "../../app/middlwares/validation-request";
import { facultyValidationSchema } from "../faculty/faculty-validation";


const router = express.Router();


router.post(
  "/create-student",
  requestValidation(studentValidation.createStudentValidationSchema),
  userController.createStudent
);
router.post("/create-faculty",
    requestValidation(facultyValidationSchema.createFacultyValidationSchema),
    userController.createFaculty
)
export const UserRoute = router;
