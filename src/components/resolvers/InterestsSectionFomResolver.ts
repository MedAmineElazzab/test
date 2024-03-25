import { Wording } from "@/lib";
import * as yup from "yup";

const schema = yup.object({
  specialityIds: yup.array().min(1).required(Wording.field_required),
  categorieIds: yup.array().min(1).required(Wording.field_required),
  diseaseIds: yup.array().min(1).required(Wording.field_required),
});

export const InterestsSectionFomResolver = schema;
