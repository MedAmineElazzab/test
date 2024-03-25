import { Wording } from "@/lib";
import * as yup from "yup";
const phoneNumberSchema = yup.object({
  code: yup
    .string()
    .matches(
      /^\+[\d]{1,3}$/,
      "Phone code must start with '+' and contain 1 to 3 digits"
    )
    .required(Wording.countryPhone_required),
  number: yup
    .string()
    .required(Wording.countryPhone_empty)
    .min(9, Wording.countryPhone_valide)
    .max(12, Wording.countryPhone_valide),
});
const schema = yup.object({
  titleId: yup.string().required(Wording.field_required),
  firstName: yup.string().required(Wording.field_required),
  lastName: yup.string().required(Wording.field_required),
  gender: yup.string().required(Wording.field_required),
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, Wording.email_format_invalid)
    .required(Wording.field_required),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email")], Wording.email_must_match)
    .required(Wording.field_required),
  phoneNumber: phoneNumberSchema.required(Wording.field_required),
  password: yup
    .string()
    .min(8, Wording.password_max_min_limit)
    .max(20, Wording.password_max_min_limit)
    .required(Wording.field_required)
    .test("password", Wording.password_check, (value) => {
      return /^(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Za-z]).{8,}$/.test(
        value
      );
    }),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], Wording.passwords_must_match)
    .required(Wording.field_required),
  activationCode: yup.string(),
});

export const RegisterFormResolver = schema;
