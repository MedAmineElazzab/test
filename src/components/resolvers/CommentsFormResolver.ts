import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  text: yup.string().required(Wording.field_required),
});

export const CommentsFormResolver = schema;
