import { PaginationProps } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import { City } from ".";
import api from "./api";
import { BACKEND_ROUTES } from "@/enum";
export interface Country {
  id: number;
  name_ru: string;
  name_en: string;
  name_de: string;
  name_es: string;
  name_fr: string;
  name_ja: string;
  native_name: string;
  alpha2_code: string;
  alpha3_code: string;
  flag: string;
  region: string;
  subregion: string;
  phone_prefix: string;
  nationality: string;
  currency: string;
  creditsafe_country: string;
  numberic_code: string;
  createdAt: string;
  updatedAt: string;
}

export function useGetCountries({
  page,
  perPage,
  sortBy,
  sortOrder,
}: PaginationProps) {
  return useQuery(["GET_COUNTRIES"], async () => {
    const params = `sortBy=${sortBy || null}&sortOrder=${sortOrder || null}`;
    const { data } = await api.get<Country[]>(
      BACKEND_ROUTES.COUNTRY + `?` + params
    );
    return data;
  });
}

export async function fetchCities(countryId?: number) {
  if (countryId) {
    const { data } = await api.get<City[]>(
      BACKEND_ROUTES.CITY + `/${countryId}`
    );
    return data;
  }
  return null;
}