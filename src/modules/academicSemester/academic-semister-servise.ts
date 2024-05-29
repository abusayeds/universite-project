
import { acadamicSEmestarNamecodeMepper } from "./academic-semester-constans";
import { TAcademicSemester } from "./academic-semister-interface";
import { academicSemestarModel } from "./academic-semister-model";


const createAcadamicSemestaeServiseDB = async(payload: TAcademicSemester) => {
   if(acadamicSEmestarNamecodeMepper[payload.name] !== payload.code){
              throw new Error ('inalid code use')
       }
       const result = await academicSemestarModel.create(payload)
        return result
}
// get all semestar

const getaAllAcademicSemestarDB = async () => {
    const result = await academicSemestarModel.find()
    return result
}
// get single user
const getSingleAcademicSemester =async (id:string) => {
     const result = await academicSemestarModel.findById(id)
     return result
}
// update  academic  samester 

const UpdateAcadamicSemesterDB = async (id: string , payload: Partial<TAcademicSemester>)  => {
    if(payload.name && payload.code && acadamicSEmestarNamecodeMepper[payload.name] !== payload.code) {
     throw new Error ('Invalid code & name ')
    }
    const result = await academicSemestarModel.findByIdAndUpdate({_id: id}, payload,{new: true})
    return result
}
export const acadamicSemesterServise = {
    createAcadamicSemestaeServiseDB,
    getaAllAcademicSemestarDB,
    getSingleAcademicSemester,
    UpdateAcadamicSemesterDB
    
}