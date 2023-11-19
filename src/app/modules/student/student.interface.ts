export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
}

export interface LocalGuardian {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: Address;
}

export interface Student {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  birthDate: string;
  email: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: Address;
  permanentAddress: Address;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'Active' | 'Blocked';
}
