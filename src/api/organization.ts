import { Meta, PaginationProps } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Speciality } from "./speciality";
import { Country } from "./countries";
export interface Organization {
  id: number;
  name: string;
  slug: string;
  about: string;
  resume: string;
  note: string;
  website: string;
  linkedin: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  speciality: Speciality;
  country: Country;
  OrganizationFollower: [];
  _count: {
    OrganizationFollower: number;
    NoteOrganization: number;
    ModulePartner: number;
  };
  isFollowed: boolean;
  followersCount: number;
  topFollowers: {
    imagePath?: string;
    firstName: string;
    lastName: string;
  }[];
  activitationCode: string;
  imagePath: string;
  isMarked: boolean;
  abbreviation: string;
}
export interface CustomeOrganization {
  id: number;
  userId: number;
  name: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useGetOrganizations({
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
      ? ["GET_ORGANIZATIONS"]
      : [
          "GET_ORGANIZATIONS",
          "page : " + page,
          "perPage : " + perPage,
          "sortBy : " + sortBy,
          "sortOrder : " + sortOrder,
        ],
    async () => {
      const { data } = await api.get<{
        items: Organization[];
        meta: Meta;
      }>(
        `/organization`,
        !isAll
          ? {
              params: { page, perPage, sortBy, sortOrder },
            }
          : { params: { perPage: 10000 } }
      );
      return data.items;
    }
  );
}

export function useGetOneOrganization(id: number) {
  return useQuery(["GET_ORGANIZATION", id], async () => {
    const { data } = await api.get<Organization>(`/organization/${id}`);
    return data;
  });
}
