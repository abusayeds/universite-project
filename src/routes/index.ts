import { Router } from "express";
import { UserRoute } from "../modules/user/user-route";
import { StudentRoutes } from "../modules/student/student-route";
import { acadamicSemesterRoute,  } from "../modules/academicSemester/academic-semister-route";
import { acadamicFacultyRoute } from "../modules/academicFaculty/academicFaculty-route";
import { acadamicdepartmentRoute } from "../modules/academicDepartment/academicDepartment-Route";

const router = Router();

router.use("/users", UserRoute);
router.use("/students", StudentRoutes);
router.use("/acadamicSemester", acadamicSemesterRoute);
router.use("/acadamicFaculty", acadamicFacultyRoute);
router.use("/acadamicdepartment", acadamicdepartmentRoute);

export default router;
