import { useQuery } from "@tanstack/react-query";
import api from "./api";
export interface Organization {
  id: number;
  name: string;
  activitationCode: string;
  slug: string;
  imagePath: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  items?: any;
  isMarked: boolean;
  abbreviation : string;
}
export function useGetOrganizations() {
  return useQuery(["GET_ORGANIZATIONS"], async () => {
    const { data } = await api.get<Organization[]>(`/organization`);
    return data;
  });
}


export function useGetOneOrganization(id: number) {
  return useQuery(["GET_ORGANIZATION", id], async () => {
    const { data } = await api.get<Organization>(`/organization/${id}`);
    return data;
  });
}
