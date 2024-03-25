import { Meta, PaginationProps } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Category } from "./category";
import { Expert } from "./expert";
import { Module } from "./module";
import { Attachement, HashTag } from "./note";
import { Organization } from "./organization";
import { Disease } from "./pathology";
import { Profession } from "./professions";
import { Speciality } from "./speciality";

export interface SerieProfession {
  serieId: 1;
  professionId: 3;
  profession : Profession
}
export interface SerieHashTag {
  hashTag: HashTag;
  hashTagId: number;
  noteId: number;
}
[];
export interface SerieExpert {
  serieId: number;
  expertId: number;
  expert: Expert;
}
export interface SerieOrganization {
  serieId: number;
  organizationId: number;
  organization: Organization;
}
export interface SeriePartner {
  organizationId: number;
  serieId: number;
  organization: Organization;
}
export interface Serie {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  language: "EN" | "FR" | "AR";
  slug: string;
  certificationId: number;
  specialityId: number;
  pathologyId: number;
  categoryId: number;
  imagePath : string;
  createdAt: string;
  updatedAt: string;
  SerieProfession: SerieProfession[];
  SerieReview: [];
  SerieModule: Module[];
  SerieExpert: SerieExpert[];
  SerieOrganization: SerieOrganization[];
  SeriePartner: SeriePartner[];
  SerieHashTag: [];
  certification: number;
  isBookmarked: boolean;
  isEnrolled : boolean;
  isFlagged: boolean;
  reviews: number;
  views: any;
  category: Category;
  speciality: Speciality;
  reviewsCount: number;
  disease: Disease;
  UserEnrollSerie: [];
  duration: number;
  _count: {
    SerieModule: 0;
  };
  Attachement: Attachement[];
}


export function useGetSeries({
  isAll = false,
  page = 1,
  perPage = 1000000,
  sortBy = "id",
  sortOrder = "desc",
}: {
  isAll?: boolean;
} & PaginationProps) {
  return useQuery(
    isAll
      ? ["GET_SERIES"]
      : [
          "GET_SERIES",
          "page : " + page,
          "perPage : " + perPage,
          "sortBy : " + sortBy,
          "sortOrder : " + sortOrder,
        ],
    async () => {
      const { data } = await api.get<{
        items: Serie[];
        meta: Meta;
      }>(`/serie`, {
        params: { page, perPage, sortBy, sortOrder },
      });
      return data.items;
    }
  );
}

export async function Bookmark_Serie(slug: string) {
  const data = await api.patch(`/serie/bookmark/${slug}`);
  return data;
}

export async function Flag_Serie(slug: string) {
  const data = await api.patch(`/serie/flag/${slug}`);
  return data;
}


export async function Enroll_Serie(slug: string) {
  const data = await api.post(`/serie/enroll/${slug}`);
  return data;
}
