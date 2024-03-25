import { useQuery } from "@tanstack/react-query";
import api from "./api";
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
  slug : string;
  isFollowed : boolean;
  _count: {
    ExpertsFollowers: number;
    ExpertSpeciality: number;
    MasterClassExperts: number;
    ModuleExpert: number;
    NoteExpert: number;
    SerieExpert: number;
  };
  ExpertsFollowers: { expertId: number; userId: number }[];
}
export function useGetExperts() {
  return useQuery(["GET_EXPERTS"], async () => {
    const { data } = await api.get<Expert[]>(`/expert`);
    return data;
  });
}

export function useGetOneExpert(id: number) {
  return useQuery(["GET_EXPERT", id], async () => {
    const { data } = await api.get<Expert>(`/expert/${id}`);
    return data;
  });
}

export async function FollowExpert(id: number) {
  const data = await api.post(`/expert/follow/${id}`);
  return data;
}
