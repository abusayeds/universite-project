import { TAcademicFaculty } from "./academicFaculty-Interface"
import { AcademicFacultyModel } from "./academicFaculty-model"
//create AcamdmicFaculty
const createAcamdmicFacultyServiseDB =  async (payload: TAcademicFaculty) => {
    const result = await AcademicFacultyModel.create(payload)
    return result
}
// get AcamdmicFaculty
const getAcamdmicFacultyServiseDB = async () => {
    const result = await AcademicFacultyModel.find()
    return result
}
// get single AcamdmicFaculty
const getSingleAcamdmicFacultyServiseDB = async (id: string ) => {
    const result = await AcademicFacultyModel.findById(id)
    return result
}
//update AcamdmicFaculty
const updateAcamdmicFacultyServiseDB = async(id: string,payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFacultyModel.findByIdAndUpdate({_id: id}, payload,{new: true})
    return result
} 
export const AcademicFacultyServise = {
    createAcamdmicFacultyServiseDB,
    getAcamdmicFacultyServiseDB,
    getSingleAcamdmicFacultyServiseDB,
    updateAcamdmicFacultyServiseDB
}