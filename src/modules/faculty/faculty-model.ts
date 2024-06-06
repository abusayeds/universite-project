import { Schema, model } from "mongoose";
import { TFaculty, TUserName } from "./faculty-intarface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const facultySchema = new Schema<TFaculty>({
  id: {
    type: String,
    required: [true, "ID is required"],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique : true,
    ref: "UserModel"
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender : {
    type : String,
    enum :["male", "female", "other"],
    required: true
  },
  
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+','B-' , 'AB+' , 'AB-', 'O+','O-'],
    required: true,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  profileImg: { type: String },
  academicDepartment: {
     type: Schema.Types.ObjectId,
     required: [true, 'AcademicDepartmentModel id is required '],
     ref:'AcademicDepartment'
      },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  
},
{
toJSON: {
    virtuals: true,
}
}
);
facultySchema.virtual('FullName'). get(function () {
return(
    `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
)
}) 

export const facultyModel = model<TFaculty>('Faculty', facultySchema)

