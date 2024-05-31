import express from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { AcademicFacultyVaalidation } from "./academicFaculty-Validation";
import { acadamicFacultyController } from "./academicFaculty-Controller";

const router = express.Router();
router.post(
  "/create-acadamic-faculty",
  requestValidation(AcademicFacultyVaalidation.AcademicFacultyValidationSchema),
  acadamicFacultyController.createAcadamicFaculty

);
router.get("/All-acadamic-faculty",
    requestValidation(AcademicFacultyVaalidation.AcademicFacultyValidationSchema),
    acadamicFacultyController.getaAllAcadamicFaculty
)
router.get("/:facultyId",

  requestValidation(AcademicFacultyVaalidation.AcademicFacultyValidationSchema),
    acadamicFacultyController.getSingleAcadamicFaculty
)
router.patch("/:facultyId",

requestValidation(AcademicFacultyVaalidation.updateAcademicFacultyValidationSchema),
acadamicFacultyController.UpdateAcademicFaculty
)
export const acadamicFacultyRoute = router;
