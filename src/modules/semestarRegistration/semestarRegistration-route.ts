import  express  from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { SemesterRegistrationValidations } from "./semestarRegistration-validation";
import { SemestarRegistationController } from "./semestarRegistration-controller";
const router = express.Router()



 router.post('/create-semestar-registation',
    requestValidation(SemesterRegistrationValidations.semesterRegistrationValidationSchema),
    SemestarRegistationController.createSemestarRegistation
 )
 router.get('/', SemestarRegistationController.gelAllRegistationSEmester)
 router.get('/:id', SemestarRegistationController.SingleRegistationSEmester)
 
 router.patch('/:id',
    requestValidation(SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema),
    SemestarRegistationController.updateSemestarRegistation
 )
export const semestarRegistationRoute = router