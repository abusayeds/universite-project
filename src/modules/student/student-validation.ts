
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
        body:z.object({
        password: z.string().max(20),
        student :z.object({
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
})

// update userNameSchema 

const updateUserNameSchema = z.object({
    fristName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
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
///UpdateStudentLocalGuardianSchema

const updateStudentLocalGuardianSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
  });

// updateStudentValidationSchemA
    
const updateStudentValidationSchema = z.object({
    body:z.object({
        password: z.string().max(20).optional(),
        student : z.object({
        id: z.string().optional(),
        dateOfBirth: z.string().optional(),
        name: updateUserNameSchema.optional(),
        gender: z.enum(["male", "female", "other"]).optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateStudentGuardianSchema.optional(),
        localGuardian: updateStudentLocalGuardianSchema.optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImg: z.string().optional(),
        isDeleted: z.boolean().default(false).optional(),
        })
   })
})

export const studentValidation = {
    createStudentValidationSchema,
    updateStudentValidationSchema
};
