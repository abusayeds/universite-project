
import { z } from "zod";

const userNameSchema = z.object({
  fristName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});
// update userNameSchema 

const updateUserNameSchema = z.object({
    fristName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  });

const studentGuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});
// UPdatestudentGuardianSchema
const updateStudentGuardianSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
  });

const studentLocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});
///UpdateStudentLocalGuardianSchema

const updateStudentLocalGuardianSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
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
        academicDepartment: z.string(),
        profileImg: z.string().optional(),
        isDeleted: z.boolean().default(false).optional(),
   })
})

// updateStudentValidationSchemA
    
const updateStudentValidationSchema = z.object({
    body:z.object({
        id: z.string().optional(),
        password: z.string().max(20).optional(),
        dateOfBirth: z.string().optional(),
        name: updateUserNameSchema,
        gender: z.enum(["male", "female", "other"]).optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateStudentGuardianSchema,
        localGuardian: updateStudentLocalGuardianSchema,
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImg: z.string().optional(),
        isDeleted: z.boolean().default(false).optional(),
   })
})

export const studentValidation = {
    createStudentValidationSchema,
    updateStudentValidationSchema
};
