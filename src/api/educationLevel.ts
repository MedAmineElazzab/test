import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface EducationLevel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetEducationLevels() {
  return useQuery(["GET_EDUCATION_LEVELS"], async () => {
    const { data } = await api.get<EducationLevel[]>(`/education-level`);
    return data;
  });
}
