import { BACKEND_ROUTES } from "@/enum";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Country } from "./countries";
export interface Expert {
  id: number;
  firstName: string;
  lastName: string;
  note: string;
  language: string;
  about: string;
  resume: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  isFollowed: boolean;
  _count: {
    ExpertsFollowers: number;
    ExpertSpeciality: number;
    MasterClassExperts: number;
    ModuleExpert: number;
    NoteExpert: number;
    SerieExpert: number;
  };
  topFollowers: {
    imagePath?: string;
    firstName: string;
    lastName: string;
  }[];
  ExpertsFollowers: { expertId: number; userId: number }[];
  country: Country;
  followersCount: number;
  linkedin: string;
  website: string;
}
export function useGetExperts() {
  return useQuery(["GET_EXPERTS"], async () => {
    const { data } = await api.get<Expert[]>(BACKEND_ROUTES.EXPERT);
    return data;
  });
}

export function useGetOneExpert(id: number) {
  return useQuery(["GET_EXPERT", id], async () => {
    const { data } = await api.get<Expert>(BACKEND_ROUTES.EXPERT + `/${id}`);
    return data;
  });
}
