import { Meta, PaginationProps } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Speciality {
  id: number;
  name: string;
  color: string;
  language: string;
  professionId: number;
  createdAt: string;
  updatedAt: string;
}

export function useGetSpecialities({
  isAll = false,
  page = 1,
  perPage = 10000,
  sortBy = "name",
  sortOrder = "asc",
}: {
  isAll?: boolean;
} & PaginationProps) {
  return useQuery(
    isAll
      ? ["GET_SPECIALITIES"]
      : [
          "GET_SPECIALITIES",
          "page : " + page,
          "perPage : " + perPage,
          "sortBy : " + sortBy,
          "sortOrder : " + sortOrder,
        ],
    async () => {
      const { data } = await api.get<{
        items: Speciality[];
        meta: Meta;
      }>(`/speciality`, {
        params: { page, perPage, sortBy, sortOrder },
      });
      return data.items;
    }
  );
}

export function useGetOneSpeciality(id: number) {
  return useQuery(["GET_SPECIALITIE", id], async () => {
    const { data } = await api.get<Speciality>(`/speciality/${id}`);
    return data;
  });
}
