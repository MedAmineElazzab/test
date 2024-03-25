import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Title {
  id: number;
  name: string;
  abbreviation: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetTitles() {
  return useQuery(["GET_TITLES"], async () => {
    const { data } = await api.get<Title[]>(`/title`);
    return data;
  });
}
