import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, Wording.email_format_invalid)
    .required(Wording.field_required),
  password: yup.string().required(Wording.field_required),
  remember: yup.boolean().default(false).optional(),
});

export const LoginFormResolver = schema;
