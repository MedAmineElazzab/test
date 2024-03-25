export interface RegisterFormtype {
  firstName: string;
  lastName: string;
  gender: string;
  // profession: string;
  email: string;
  phoneNumber: string;
  password: string;
  activationCode: string;
}
export interface ProfessionalInformationForm {
  profession: string | number;
  educationLevel: string | number;
  country: string | number;
  city: string | number;
  environment: string | number;
  institution: string | number;
  yearOfExercise: string;
}

export interface SectionsForm {
  sections: number[];
}

export interface AccountVerificationForm {
  registrationNumber: string;
  Attachement?: File | string;
}
