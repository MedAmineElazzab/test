import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Category {
  id: number;
  name: string;
  color: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetCategories() {
  return useQuery(["GET_CATEGORIES"], async () => {
    const { data } = await api.get<Category[]>(`/category`);
    return data;
  });
}

export function useGetOneCategory(id: number) {
  return useQuery(["GET_CATEGORY", id], async () => {
    const { data } = await api.get<Category>(`/category/${id}`);
    return data;
  });
}
