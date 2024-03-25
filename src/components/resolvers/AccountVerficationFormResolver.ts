import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  registrationNumber: yup.string().optional().min(6,Wording.code_limit).max(10,Wording.code_limit),
  categoryDocs: yup.string().optional(),
  file: yup.string().optional(),
});

export const AccountVerficationFormResolver = schema;
