import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Dci {
  id: number;
  name: string;
  color: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetDcis() {
  return useQuery(["GET_MEDICINES"], async () => {
    const { data } = await api.get<Dci[]>(`/dci`);
    return data;
  });
}

export function useGetDci(id: number) {
  return useQuery(["GET_MEDICINE", id], async () => {
    const { data } = await api.get<Dci>(`/dci/${id}`);
    return data;
  });
}
