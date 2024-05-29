import express from "express";
import { acadamicSemeterController } from "./academic-semister-controller";
import requestValidation from "../../app/middlwares/validation-request";
import { acadamicSemesterValidation } from "./academic-semister-validation";

const router = express.Router();
router.post(
  "/create-acadamic-semester",
  requestValidation(acadamicSemesterValidation.acadamicSemesterValidationSchema),
  acadamicSemeterController.createAcadamicSemester
);
router.get("/All-acadamic-semester",
    requestValidation(acadamicSemesterValidation.acadamicSemesterValidationSchema),
    acadamicSemeterController.getaAllAcamicSemestar
)
router.get("/:semesterId",
    requestValidation(acadamicSemesterValidation.acadamicSemesterValidationSchema),
    acadamicSemeterController.getSingleAcademicSemestar
)
router.patch("/:semesterId",
    requestValidation(acadamicSemesterValidation.UpdateAcadamicSemesterValidationSchema),
    acadamicSemeterController.UpdateAcadamicSemester
)
export const acadamicSemesterRoute = router;
