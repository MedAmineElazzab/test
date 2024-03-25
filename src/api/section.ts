import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Section {
  id: number;
  name: string;
  alias: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetSections() {
  return useQuery(["GET_SECTIONS"], async () => {
    const { data } = await api.get<Section[]>(`/section`);
    return data;
  });
}
