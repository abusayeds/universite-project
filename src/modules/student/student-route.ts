import express from 'express'

import { studentController } from './student-controller'
import requestValidation from '../../app/middlwares/validation-request'
import { studentValidation } from './student-validation'


const router = express.Router()

router.get('/', studentController.getAllStudents)
router.get('/:Id',studentController.getSingleStudent)
router.delete('/:Id',studentController.deleteStudent)
router.patch('/:Id',requestValidation
    (studentValidation.updateStudentValidationSchema),
     studentController.updateStudent
    )

export const StudentRoutes = router