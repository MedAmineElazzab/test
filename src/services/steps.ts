import { Steps } from "@/@types";
import { api } from "@/api";
import { User } from "@/api/user";
import {
  AccountVerficationFormtype,
  InterestsSectionsFormForm,
  PersonalInformationsFormData,
} from "@/components";
import { separateNumbersAndStrings } from "@/lib";

interface handleProfessionSaveProps {
  professionId: number;
  step: Steps;
}
interface SeparatedData {
  numbers: number[];
  strings: string[];
}
export type PersonalInformationsSaveData = {
  institutions: (string | number)[];
  yearOfExercise?: string;
  educationLevelId?: number;
  environmentId?: number;
  specialityId?: number;
  cityId?: number;
};
interface handlePersonalInformationsSaveProps {
  data: PersonalInformationsFormData;
  userType: "EXPERT" | "STUDENT";
}

export const handleProfessionStepSave = async (
  props: handleProfessionSaveProps
): Promise<User | null> => {
  try {
    const { data } = await api.post<User>("/users/signup/profession", {
      professionId: props.professionId,
      signupStep: "INFORMATION",
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handlePersonalInformationsSave = async (
  props: handlePersonalInformationsSaveProps
) => {
  const {
    institutions,
    yearOfExercise,
    educationLevelId,
    environmentId,
    specialityId,
    cityId,
  } = props.data;

  const [numbers, strings] = separateNumbersAndStrings(institutions);

  const requestData = {
    organizationIds: numbers.map(Number),
    yearOfExercise: props.userType === "EXPERT" ? yearOfExercise : undefined,
    educationLevelId:
      props.userType === "STUDENT" ? educationLevelId : undefined,
    environmentId: props.userType === "STUDENT" ? undefined : environmentId,
    specialityId,
    cityId: Number(cityId),
    signupStep: "INTERESTS",
    customeOrganization: strings,
  };

  try {
    const { data } = await api.post<User>(
      "/users/signup/information",
      requestData
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleInitSave = async function () {
  try {
    const response = await api.post("/users/signup/init", {
      signupStep: "SIGNUP",
    });
    return response; // Return the response for further handling
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error for further handling
  }
};

export const handleInterestsSave = async function (
  data: InterestsSectionsFormForm
) {
  try {
    const response = await api.post<User>("/users/signup/interests", {
      specialityIds: data.specialityIds.map((id) => Number(id)),
      diseaseIds: data.diseaseIds.map((id) => Number(id)),
      categorieIds: data.categorieIds.map((id) => Number(id)),
      signupStep: "VERIFICATION",
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleAccountVerifSave = async function (
  data: AccountVerficationFormtype
) {
  try {
    const { data: user } = await api.post<User>(
      "/users/signup/verification",
      { ...data, signupStep: "DONE" },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
