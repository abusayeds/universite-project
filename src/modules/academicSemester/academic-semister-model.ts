import { Schema, model } from "mongoose";
import { TAcademicSemester} from "./academic-semister-interface";
import { Months, academicSemisterCodeSchema, academicSemisterNameSchema } from "./academic-semester-constans";

const academicSemestarSchema = new Schema<TAcademicSemester>(
    {
      name: {
        type: String,
        required: true,
        enum: academicSemisterNameSchema
      },
      code: {
        type: String,
        required: true,
        enum : academicSemisterCodeSchema
      },
      year: {
        type: String,
        required: true,
        
      },
      startMonth: {
        type: String,
        required: true,
        enum: Months,
      },
    
      endMonth: {
        type: String,
        required: true,
        enum: Months,
      },
     
    },
    {
      timestamps: true,
    }
  );


  academicSemestarSchema.pre('save', async function () {
    const isSemesterExists = await academicSemestarModel.findOne({
        year: this.year,
        name: this.name
    })
    if(isSemesterExists){
        throw new Error('Semestar is alredy exists')
    }
  })

  export const academicSemestarModel = model<TAcademicSemester>('AcademicSemester', academicSemestarSchema)