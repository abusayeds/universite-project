import { z } from "zod";
import { Months, academicSemisterCodeSchema, academicSemisterNameSchema } from "./academic-semester-constans";


const acadamicSemesterValidationSchema = z.object({
body: z.object({
    name: z.enum([...academicSemisterNameSchema] as [string, ...string[]]),
    code : z.enum([...academicSemisterCodeSchema] as [string, ...string[]]),
    year : z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth : z.enum([...Months] as [string, ...string[]])

})
}) 

const UpdateAcadamicSemesterValidationSchema = z.object({
body: z.object({
    name: z.enum([...academicSemisterNameSchema] as [string, ...string[]]).optional(),
    code : z.enum([...academicSemisterCodeSchema] as [string, ...string[]]).optional(),
    year : z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth : z.enum([...Months] as [string, ...string[]]).optional()
})
}) 
 export const acadamicSemesterValidation = {
    acadamicSemesterValidationSchema,
    UpdateAcadamicSemesterValidationSchema 
}


