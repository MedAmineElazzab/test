import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Institution {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetInstitutions() {
  return useQuery(["GET_INSTITUTIONS"], async () => {
    const { data } = await api.get<Institution[]>(`/institution`);
    return data;
  });
}
