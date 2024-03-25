import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  gender: yup.string().required("Gender is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("phone is required").max(14).min(10),
  password: yup
    .string()
    .min(6)
    .max(20)
    .required("Password is required")
    .test(
      "password",
      "Password must include at least one special symbol, one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long.",
      (value) => {
        return /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(
          value
        );
      }
    ),
  activationCode: yup.string().required("activationCode is required"),
});

export const RegisterFormResolver = schema;
