import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Profession {
  id: number;
  name: string;
  createdAt: string;
  color: string;
  language: string;
  updatedAt: string;
  type : "EXPERT" | "STUDENT"
}

export function useGetProfessions() {
  return useQuery(["GET_PROFESSIONS"], async () => {
    const { data } = await api.get<Profession[]>(`/profession`);
    return data;
  });
}


export function useGetOneProfession(id : number) {
  return useQuery(["GET_PROFESSION",id], async () => {
    const { data } = await api.get<Profession>(`/profession/${id}`);
    return data;
  });
}
