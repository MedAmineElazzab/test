import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  professionId: yup.number().required(Wording.field_required),
});

export const professionFormResolver = schema;