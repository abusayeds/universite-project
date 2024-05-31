
import mongoose from "mongoose";
import config from "../../app/config";
import { academicSemestarModel } from "../academicSemester/academic-semister-model";
import { TStudent } from "../student/student-interface";
import { Student } from "../student/student-model";
import { Tuser } from "./user-interface";
import { UserModel } from "./user-model";
import { generateStudentId } from "./user-utilis";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";

const createStudentDB = async ( password: string, payload:TStudent) => {
    
     const userData : Partial<Tuser> = {}  
     userData.password = password  || (config.defoult_pasword )
     userData.role = 'student'
     const admissionSemister = await academicSemestarModel.findById(payload.admissionSemester)
     const session = await mongoose.startSession()
     try{
        session.startTransaction()
        userData.id = await generateStudentId(admissionSemister)
        const newUser = await UserModel.create([userData],{session})
       if(!newUser.length){
        throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user')
       }
        payload.id = newUser[0].id 
        payload.user = newUser[0]._id
        const newStudent = await Student.create([payload],{session})
        if(!newStudent.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student')
           }
          await session.commitTransaction()
          await session.endSession ()
        return newStudent
      
      } catch(err){
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST,'Student creating faild')
      }
   
}
export const UserServise = {
    createStudentDB
}   