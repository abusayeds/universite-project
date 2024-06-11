import express from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { OfferedCourseValidations } from "./offeredCourse-validation";
import { offeredCourseController } from "./offeredCourse-controller";
const router = express.Router();

router.post(
  "/create-offered-course",
  requestValidation(
    OfferedCourseValidations.createOfferedCourseValidationSchema
  ),
  offeredCourseController.createofferedCourse
);
router.patch(
  "/:id",
  requestValidation(
    OfferedCourseValidations.updateOfferedCourseValidationSchema
  ),
  offeredCourseController.updateferedCourse
);
export  const offeredCourseRoute = router