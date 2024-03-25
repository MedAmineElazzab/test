import { Steps } from "@/@types";
import { Pages, ProfileCompletion, TitleName } from "@/enum";
import { City, CustomeOrganization, Organization, Profession } from ".";
import api from "./api";

interface RegisterProps {
  titleId: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  password: string;
  activationCode: string;
  googleTokenId?: string;
  linkedinTokenId?: string;
}
export async function Register(user: RegisterProps) {
  try {
    const { data, status } = await api.post<{
      email: string;
      message: string;
      accessToken: string;
      user: User;
    }>(Pages.Register_URL, { ...user });
    return { ...data, status, error: null };
  } catch (error) {
    return {
      user: null,
      accessToken: null,
      message: null,
      email: null,
      status: null,
      error: error as any,
    };
  }
}

export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  password: string;
  gender: "MALE" | "FEMALE";
  firstName: string;
  lastName: string;
  imagePath: string;
  yearOfExercise: string;
  yearOfWork: string;
  registrationNumber: string;
  professionId: number;
  cityId: number;
  educationLevelId: number;
  environmentId: number;
  specialityId: number;
  createdAt: string;
  updatedAt: string;
  profileCompletion: ProfileCompletion;
  signupStep: Steps;
  titleName: TitleName;
  categoryDocs: any;
  educationLevel: number;
  environment: null;
  profession: Profession;
  city: City;
  Organizations: Organization[];
  UserCustomeOrganization: CustomeOrganization | null;
  userIntrestsId: {
    UserCategoryIntrests: {
      userIntrestsId: number;
      categoryId: number;
    }[];
    UserDiseaseIntrests: {
      userIntrestsId: number;
      diseaseId: number;
    }[];
    UserSpecialityIntrests: {
      userIntrestsId: number;
      specialityId: number;
    }[];
  };
}
