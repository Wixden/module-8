import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: IStudent) => {
  const result = await Student.create(student);

  return result;
};

const getAllStudent = async () => {
  const result = await Student.find();
  return result;
};

const getOneStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudent,
  getOneStudent,
};
