import { TAcademicSemester } from "../academicSemester/academic-semister-interface";
import { UserModel } from "./user-model";



const findLastStudent = async () => {
    const lastStudent = await UserModel.findOne(
        {
            role: "student"    
        },
        {
          id: 1,
       
        }
     ).sort({
        createdAt: -1
     })
     .lean()
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}


export  const generateStudentId = async(payload:TAcademicSemester) => {
    let currentId = (0).toString()
    const lastStudentId = await findLastStudent();
    const lastStudentSemesterCode = lastStudentId?.substring(4,6) //01 
    const lastStudentYear = lastStudentId?.substring(0,4)  //2030
    const currentSemesterCode = payload.code
    const currentYear = payload.year
    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && 
    lastStudentYear=== currentYear){
         currentId = lastStudentId.substring(6) 
    }

    let incrementId = (Number(currentId) +1).toString().padStart(4,"0")
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId
}