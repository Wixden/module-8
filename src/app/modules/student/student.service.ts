import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  // const result = await Student.create(student);

  const student = new Student(studentData); //create an instance

  if (await student.userExists(studentData.id)) {
    throw new Error(`ID: ${studentData.id}, User already exists`);
  }

  const result = await student.save();

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
