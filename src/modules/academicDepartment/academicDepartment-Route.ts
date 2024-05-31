import express from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { AcademicDepartmentVaalidation } from "./academicDepartment-Validation";
import { acadamicDepartmentController } from "./academicDepartment-controller";

const router = express.Router();
router.post(
  "/create-acadamic-department",
  requestValidation(AcademicDepartmentVaalidation.AcademicDepartmentValidationSchema),
  acadamicDepartmentController.createAcadamicDepartment
);
router.get("/All-acadamic-department",
    requestValidation(AcademicDepartmentVaalidation.AcademicDepartmentValidationSchema),
    acadamicDepartmentController.getaAllAcadamicDepartment
)
router.get("/:departmentId",
requestValidation(AcademicDepartmentVaalidation.AcademicDepartmentValidationSchema),
acadamicDepartmentController.getSingleAcamdmicDepartment
)
router.patch("/:departmentId",
requestValidation(AcademicDepartmentVaalidation.updateAcademicDepartmentValidationSchema),
acadamicDepartmentController.UpdateAcademicDepartment
)


export const acadamicdepartmentRoute = router;
