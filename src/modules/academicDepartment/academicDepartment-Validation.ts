import { z } from "zod";
const AcademicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic Department must be string ',
        required_error: "Name is required"
    }),
    academicfaculty: z.string({
        invalid_type_error: 'Academic Department must be string ',
        required_error: "Faculty is required "
    })

});
const updateAcademicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic Department must be string ',
        required_error: "Name is required" 
    }).optional(),
    academicfaculty: z.string({
        invalid_type_error: 'Academic Department must be string ',
        required_error: "Faculty is required "
    }).optional()
});
export const AcademicDepartmentVaalidation = {
    AcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}