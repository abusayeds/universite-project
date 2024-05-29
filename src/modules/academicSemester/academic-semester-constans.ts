import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academic-semister-interface";

 export const Months: TMonths[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const academicSemisterNameSchema : TAcademicSemesterName[] = ["Autumn" ,"Summar", "Fall"]
export const academicSemisterCodeSchema : TAcademicSemesterCode[] = ["01", "02", "03"]

 export type TacadamicSEmestarNamecodeMepper = {[key:string]: string}
 export const acadamicSEmestarNamecodeMepper: TacadamicSEmestarNamecodeMepper  = {
    Autumn: '01',
    Summar: '02',
    Fall: '03'
   }