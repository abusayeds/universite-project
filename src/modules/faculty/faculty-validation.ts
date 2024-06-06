import { z } from "zod";

// Zod schema for TUserName
const userNameSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1)
    .max(20, "Name cannot be more than 20 characters"),
  middleName: z.string()
    .trim()
    .optional(),
  lastName: z.string()
    .trim()
    .min(1)
    .max(20, "Name cannot be more than 20 characters")

});

const createFacultyValidationSchema = z.object({
  body: z.object({
  faculty: z.object({ 
  designation: z.string(),
  name: userNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string()
  .email("Invalid email format"),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImg: z.string().optional(),
  isDeleted: z.boolean().default(false),
})
})
});
const updtUserNameSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1)
    .max(20, "Name cannot be more than 20 characters")
    .optional(),
    
  middleName: z.string()
    .trim()
    .optional(),
  lastName: z.string()
    .trim()
    .min(1)
    .max(20, "Name cannot be more than 20 characters") 
      .optional(),

});

const updateFacultyValidationSchema = z.object({
  body: z.object({
  faculty: z.object({ 
  designation: z.string().optional(),
  name: updtUserNameSchema,
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string()
  .email("Invalid email format").optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImg: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
})
})
});

export const facultyValidationSchema =  {  
    createFacultyValidationSchema ,
    updateFacultyValidationSchema
};
