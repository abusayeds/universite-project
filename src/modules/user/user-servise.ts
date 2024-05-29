
import config from "../../app/config";
import { academicSemestarModel } from "../academicSemester/academic-semister-model";
import { TStudent } from "../student/student-interface";
import { Student } from "../student/student-model";
import { Tuser } from "./user-interface";
import { UserModel } from "./user-model";
import { generateStudentId } from "./user-utilis";

const createStudentDB = async ( password: string, payload:TStudent) => {
    
     const userData : Partial<Tuser> = {}  
     userData.password = password  || (config.defoult_pasword )
     userData.role = 'student'
     const admissionSemister = await academicSemestarModel.findById(payload.admissionSemester)
     userData.id = await generateStudentId(admissionSemister)
    //  console.log(userData);
    const newUser = await UserModel.create(userData)
    if(Object.keys(newUser).length){
        payload.id = newUser.id 
        payload.user = newUser._id
        const newStudent = await Student.create(payload)
        
        return newStudent
    }
   
}
export const UserServise = {
    createStudentDB
}   