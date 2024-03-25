import * as yup from "yup";

const schema = yup.object({
  // profession: yup.string().required("Gender is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const ForgetPasswordResolver = schema;
