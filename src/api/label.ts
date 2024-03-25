import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Label {
  id: number;
  name: string;
  color: string;
  bgColor :string;
  createdAt: string;
  updatedAt: string;
}
export function useGetLabels() {
  return useQuery(["GET_LABELS"], async () => {
    const { data } = await api.get<Label[]>(`/label`);
    return data;
  });
}

export function useGetOneLabel(id: number) {
  return useQuery(["GET_LABEL", id], async () => {
    const { data } = await api.get<Label>(`/label/${id}`);
    return data;
  });
}
