import * as yup from "yup";

const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .test(
      "password",
      "Password must include at least one special symbol, one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long.",
      (value) => {
        return /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(value);
      }
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"), // Ensure it matches the 'password' field
});

export const ResetPasswordResolver = schema;
