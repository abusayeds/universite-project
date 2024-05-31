import { AcademicDepartmentModel } from "./academicDepartment-Model"
import { TAcademicDepartment } from "./academicDepartment-intarface"

//create Acamdmic department
const createAcamdmicDepartmentServiseDB =  async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartmentModel.create(payload)
    return result
}
// get Acamdmic department
const getAllAcamdmicDepartmentServiseDB = async () => {
    const result = await AcademicDepartmentModel.find().populate('academicfaculty')
    return result
}
// get single Acamdmic department

const getSingleAcamdmicDepartmentServiseDB = async (id : string) => {
    const result = await AcademicDepartmentModel.findById(id).populate('academicfaculty')
    console.log(result);
    return result
}

// update Acamdmic department
const updateAcamdmicDepartmentServiseDB = async(id: string,payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartmentModel.findByIdAndUpdate({_id: id}, payload,{new: true})
    return result
} 
export const AcademicDepartmentServise = {
    createAcamdmicDepartmentServiseDB,
    getAllAcamdmicDepartmentServiseDB,
    getSingleAcamdmicDepartmentServiseDB,
    updateAcamdmicDepartmentServiseDB
}