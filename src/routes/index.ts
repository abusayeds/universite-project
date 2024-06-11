import { Router } from "express";
import { UserRoute } from "../modules/user/user-route";
import { StudentRoutes } from "../modules/student/student-route";
import { acadamicSemesterRoute } from "../modules/academicSemester/academic-semister-route";
import { acadamicFacultyRoute } from "../modules/academicFaculty/academicFaculty-route";
import { acadamicdepartmentRoute } from "../modules/academicDepartment/academicDepartment-Route";
import { facultyRoute } from "../modules/faculty/faculty-route";
import { CourseRoutes } from "../modules/course/course-route";
import { semestarRegistationRoute } from "../modules/semestarRegistration/semestarRegistration-route";
import { offeredCourseRoute } from "../modules/offeredCourse/offeredCourse-route";
import { AuthRouter } from "../modules/auth/auth-route";

const router = Router();

router.use("/facultes", facultyRoute);
router.use("/users", UserRoute);
router.use("/students", StudentRoutes);
router.use("/acadamicSemester", acadamicSemesterRoute);
router.use("/acadamicFaculty", acadamicFacultyRoute);
router.use("/acadamicdepartment", acadamicdepartmentRoute);
router.use("/course", CourseRoutes);
router.use("/semestarRegistation", semestarRegistationRoute);
router.use("/offeredCourse", offeredCourseRoute);
router.use("/authUser", AuthRouter);

export default router;
