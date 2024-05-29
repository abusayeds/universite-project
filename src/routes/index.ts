import { Router } from "express";
import { UserRoute } from "../modules/user/user-route";
import { StudentRoutes } from "../modules/student/student-route";
import { acadamicSemesterRoute } from "../modules/academicSemester/academic-semister-route";

const router = Router();

router.use("/users", UserRoute);
router.use("/students", StudentRoutes);
router.use("/acadamicSemester", acadamicSemesterRoute);

export default router;
