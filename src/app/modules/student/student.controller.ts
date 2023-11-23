import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// Joi File validator
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using JOI.

    // Define JOI schema for UserName
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .required()
        .pattern(/^[A-Z][a-z]*$/),
      middleName: Joi.string(),
      lastName: Joi.string()
        .required()
        .pattern(/^[A-Z][a-z]*$/),
    });

    // Define JOI schema for Address
    const addressSchema = Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      postalCode: Joi.string().required(),
    });

    // Define JOI schema for Guardian
    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherPhone: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherPhone: Joi.string().required(),
    });

    // Define JOI schema for LocalGuardian
    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      occupation: Joi.string().required(),
      address: addressSchema.required(),
    });

    // Define JOI schema for the main Student model
    const studentSchema = Joi.object({
      id: Joi.string().required(),
      name: userNameSchema.required(),
      gender: Joi.string().valid('Male', 'Female').required(),
      birthDate: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      emergencyPhoneNumber: Joi.string().required(),
      bloodGroup: Joi.string().valid(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
      ),
      presentAddress: addressSchema.required(),
      permanentAddress: addressSchema.required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImg: Joi.string(),
      isActive: Joi.string().valid('Active', 'Blocked').default('Active'),
    });

    // creating a schema validation using JOI END.

    const { student: studentData } = req.body;
    const { error, value } = studentSchema.validate(studentData);
    console.log({ error, value });

    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: (err as Error).message,
    });
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: (err as Error).message,
    });
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: (err as Error).message,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getStudent,
};
