import { Schema, model } from "mongoose";

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TuserName,
} from "./student-interface";



const userNameSchema = new Schema<TuserName>({
    fristName: {
    type: String,
    required: true,
  },

  middleName: { type: String },
  lastName: { type: String, required: true },
});
const studentGuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const studentLocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required : [true, 'User id is required'],
    unique: true,
    ref: "User"
  },
 
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: studentGuardianSchema,
    required: true,
  },
  localGuardian: {
    type: studentLocalGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  admissionSemester : {
    type:Schema.Types.ObjectId,
    ref : 'AcademicSemester'
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  
},{
    toJSON:{
        virtuals: true
    }
}
);

studentSchema.virtual('FullName').get(function() {
    return(
        `${this?.name?.fristName} ${this?.name?.middleName} ${this?.name?.lastName}`
    )
})


studentSchema.pre('find', async function (next) {
     this.find({isDeleted: {$ne: true}}) 
next()
})
studentSchema.pre('findOne', async function (next) {
     this.find({isDeleted: {$ne: true}}) 
next()
})
studentSchema.pre('aggregate', async function (next) {
     this.pipeline().unshift({$match: {isDeleted: {$ne: true}}}) 
next()
})
 studentSchema.statics.isUserExists = async function (id: string) {
const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>(
  "studentUser",
  studentSchema
);
