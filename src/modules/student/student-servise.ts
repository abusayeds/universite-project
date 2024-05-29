// import { TStudent } from "./student-interface";
import { Student } from "./student-model";


const getAllStudentDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentDB = async (id: string) => {
  const result = await Student.findOne({ id });
//   const result = await Student.aggregate([{$match:{id:id}}]);

  return result;
};
const deleteStudentDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted: true});
  return result;
};
export const studentSerise = {
//   createStudentDB,
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB 
};
