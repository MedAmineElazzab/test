import { PaginationProps } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
interface Country {
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
    const { data } = await api.get<Country[]>(`/countries?`);
    return data;
  });
}
