import { UserTypes } from "@/@types";
import { Wording } from "@/lib";
import * as yup from "yup";

// Renaming the interface to avoid naming conflict
interface PersonalInformationsResolverInterface {
  type: UserTypes;
}

export const PersonalInformationsResolver = (
  props: PersonalInformationsResolverInterface
) => {
  return yup.object().shape({
    specialityId: yup.number().required(Wording.field_required),
    institutions: yup.array().min(1).required(Wording.field_required),
    cityId: yup.number().required(Wording.field_required),
    countryId: yup.number().required(Wording.field_required),
    ...(props.type === "STUDENT" && {
      educationLevelId: yup.number().required(Wording.field_required),
    }),
    ...(props.type === "EXPERT" && {
      yearOfExercise: yup.date().required(Wording.field_required),
      environmentId: yup.number().required(Wording.field_required),
    }),
  });
};
