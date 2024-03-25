import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Disease {
  id: number;
  name: string;
  color: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetPathologies() {
  return useQuery(["GET_PATHOLOGIES"], async () => {
    const { data } = await api.get<Disease[]>(`/disease`);
    return data;
  });
}

export function useGetOnePathology(id: number) {
  return useQuery(["GET_PATHOLOGIE", id], async () => {
    const { data } = await api.get<Disease>(`/disease/${id}`);
    return data;
  });
}
