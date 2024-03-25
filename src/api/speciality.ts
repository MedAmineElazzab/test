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
  bgColor: string;
}

export function useGetSpecialities({
  isAll = false,
  page = 1,
  perPage = 10000,
  sortBy = "name",
  sortOrder = "asc",
  professionId = null,
}: {
  isAll?: boolean;
  professionId?: number | null;
} & PaginationProps) {
  return useQuery(
    isAll && professionId
      ? [
          "GET_SPECIALITIES_OF_PROFESSION",
          page,
          perPage,
          sortBy,
          sortOrder,
          professionId,
        ]
      : isAll
      ? ["GET_SPECIALITIES"]
      : ["GET_SPECIALITIES", page, perPage, sortBy, sortOrder],
    async () => {
      const { data } = await api.get<{
        items: Speciality[];
        meta: Meta;
      }>(
        `/speciality`,
        !isAll
          ? {
              params: { page, perPage, sortBy, sortOrder },
            }
          : professionId
          ? { params: { perPage: 10000, professionId } }
          : { params: { perPage: 10000 } }
      );
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
