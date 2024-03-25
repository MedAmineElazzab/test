import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Medicine {
  id: number;
  name: string;
  color: string;
  dciId: number;
  language: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetMedicines() {
  return useQuery(["GET_MEDICINES"], async () => {
    const { data } = await api.get<Medicine[]>(`/medicine`);
    return data;
  });
}

export function useGetMedicine(id: number) {
  return useQuery(["GET_MEDICINE", id], async () => {
    const { data } = await api.get<Medicine>(`/medicine/${id}`);
    return data;
  });
}
