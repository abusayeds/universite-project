import express from 'express'
import { facultyController } from './faculty-controller'
import requestValidation from '../../app/middlwares/validation-request'
import { facultyValidationSchema } from './faculty-validation'
const router = express.Router()


router.get('/', facultyController.getAllFaculty)
router.get('/:Id', facultyController.getSingleFaculty)
router.delete('/:Id', facultyController.deleteFaculty)
router.patch('/:Id',requestValidation(facultyValidationSchema.updateFacultyValidationSchema) ,
facultyController.updateFaculty)

export  const facultyRoute = router