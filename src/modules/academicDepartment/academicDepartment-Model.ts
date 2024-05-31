import { Schema,model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment-intarface";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";


const AcademicDepartmentSchema = new Schema<TAcademicDepartment> (
    {
    name: {
        type: String,
        required: true,
       
    },
    academicfaculty: {
        type: Schema.Types.ObjectId ,
        ref : 'AcademicFaculty'
    }
    } ,
    {
        timestamps: true
    }  
)



AcademicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartmentModel.findOne({
        name : this.name
    })
    if(isDepartmentExist){
        throw new AppError ( httpStatus.NOT_FOUND,'The department alreday exist')
    }
    next()
})
AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const quary = this.getQuery()
    
    const isUpdateExxist = await AcademicDepartmentModel.findOne(quary)
    if(!isUpdateExxist){
        throw new AppError(httpStatus.NOT_FOUND,'this deperment dose exixt')
    }
    next()
})
export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', AcademicDepartmentSchema)