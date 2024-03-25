import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  // profession: yup.string().required("Gender is required"),
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, Wording.email_format_invalid)
    .required(Wording.field_required),
});

export const ForgetPasswordResolver = schema;