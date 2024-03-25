import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Environment {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetEnvironment() {
  return useQuery(["GET_ENVIRONEMENT"], async () => {
    const { data } = await api.get<Environment[]>(`/environment`);
    return data;
  });
}
