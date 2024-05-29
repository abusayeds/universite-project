
import { z } from "zod";

const userNameSchema = z.object({
  fristName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const studentGuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const studentLocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
    body :z.object({
   

        id: z.string(),
        password: z.string().max(20),
        dateOfBirth: z.string().optional(),
        name: userNameSchema,
        gender: z.enum(["male", "female", "other"]),
        email: z.string().email(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        guardian: studentGuardianSchema,
        localGuardian: studentLocalGuardianSchema,
        admissionSemester: z.string(),
        profileImg: z.string().optional(),
       
        isDeleted: z.boolean().default(false).optional(),


      })
})
    


export const studentValidation = {
    createStudentValidationSchema,
};
