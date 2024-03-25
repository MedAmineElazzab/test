import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Category {
  id: number;
  name: string;
  color: string;
  bgColor: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}
export function useGetCategories() {
  return useQuery(
    ["GET_CATEGORIES"],
    async () => {
      const { data } = await api.get<Category[]>(`/category`);
      return data;
    },
    {
      // Specify if the query should refetch on window focus
      refetchOnWindowFocus: false, // or true if needed
      // Specify if the query should refetch when the window regains focus after a network error
      refetchOnReconnect: false, // or true if needed
      // Specify if the query should refetch when the component mounts
      refetchOnMount: false, // or true if needed
      // Specify if the query should refetch on interval in milliseconds
      refetchInterval: false, // or interval in milliseconds if needed
      staleTime: Infinity, // Set to Infinity to prevent automatic refetching
      // Time in milliseconds that data should persist in the cache regardless of its freshness
      cacheTime: Infinity, // Set to Infinity to store data indefinitely
      // Specify if the query should refetch when the component mounts
    }
  );
}

export function useGetOneCategory(id: number) {
  return useQuery(["GET_CATEGORY", id], async () => {
    const { data } = await api.get<Category>(`/category/${id}`);
    return data;
  });
}
