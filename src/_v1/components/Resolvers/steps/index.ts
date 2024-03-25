import * as yup from "yup";

const schema = yup.object({
  profession: yup.string().required("profession is required"),
  educationLevel: yup.string().required("profession is required"),
  country: yup.string().required("country is required"),
  city: yup.string().required("city is required"),
  environment: yup.string().required("environment is required"),
  institution: yup.string().required("institution is required"),
  yearOfExercise: yup.string().required("yearOfExercise is required "),
});

export const ProfessionalInformationFormResolver = schema;

const schema1 = yup.object({
  sections: yup.array().required("sections are required"),
});

export const SectionsFormResolver = schema1;

const schema2 = yup.object({
  registrationNumber: yup.string().required("registrationNumber is required"),
  Attachement: yup.string(),
});

export const AccountVerificationFormResolver = schema2;
