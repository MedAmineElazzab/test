import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface City {
  id: number;
  name: string;
  countryId: number;
  createdAt: string;
  updatedAt: string;
}
export function useGetCities() {
  return useQuery(["GET_CITIES"], async () => {
    const { data } = await api.get<City[]>(`/cities`);
    return data;
  });
}
export function useGetCountryCities(countryId: number | string) {
  return useQuery(
    ["GET_COUNTRY_CITIES", countryId ? countryId : "ALL"],
    async () => {
      if (countryId == "") {
        return [];
      }
      const { data } = await api.get<City[]>(`/cities/country/${countryId}`);
      return data;
    }
  );
}

export function useGetOneCity( cityId : number) {
  return useQuery(["GET_CITY",cityId], async () => {
    const { data } = await api.get<City>(`/cities/${cityId}`);
    return data;
  });
}