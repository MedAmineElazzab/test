import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Profession {
  id: number;
  name: string;
  createdAt: string;
  color: string;
  language: string;
  updatedAt: string;
}
export function useGetProfessions() {
  return useQuery(["GET_PROFESSIONS"], async () => {
    const { data } = await api.get<Profession[]>(`/profession`);
    return data;
  });
}
