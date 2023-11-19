import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all students
const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudent();

    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get single student
const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getOneStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getStudent,
};
