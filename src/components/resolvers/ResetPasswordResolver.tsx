import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  password: yup
    .string()
    .required(Wording.field_required)
    .test("password", Wording.password_check, (value) => {
      return /^(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Za-z]).{8,}$/.test(
        value
      );
    }),
  confirmPassword: yup
    .string()
    .required(Wording.field_required)
    .oneOf([yup.ref("password")], Wording.passwords_must_match), // Ensure it matches the 'password' field
});

export const ResetPasswordResolver = schema;