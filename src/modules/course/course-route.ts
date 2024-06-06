
import express from 'express';
import { CourseController } from './course-controller';
import requestValidation from '../../app/middlwares/validation-request';
import { courseValidation } from './course-validation';

const router = express.Router();

router.post(
  '/create-course',
  requestValidation(courseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/',CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.patch('/:id',
requestValidation(courseValidation.updateCourseValidationSchema),
CourseController.updateCourse);
router.put('/:courseId/assign-faculty',
    requestValidation(courseValidation.facultiesWithCourseValidationSchema),
    CourseController.CourseFacultyUpdate
)
router.delete('/:courseId/remove-faculty',
    requestValidation(courseValidation.facultiesWithCourseValidationSchema),
    CourseController.deleteCourseFaculty
)
router.delete('/:id', CourseController.deleteCourse);


export const CourseRoutes = router;
