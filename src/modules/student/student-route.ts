import express from 'express'

import { studentController } from './student-controller'
import requestValidation from '../../app/middlwares/validation-request'
import { studentValidation } from './student-validation'


const router = express.Router()

// router.post('/create-student', studentController.createStudent)
router.get('/', studentController.getAllStudents)
router.get('/:studentID',studentController.getSingleStudent)
router.delete('/:studentID',studentController.deleteStudent)
router.patch('/:studentID',requestValidation
    (studentValidation.updateStudentValidationSchema),
     studentController.updateStudent
    )

export const StudentRoutes = router