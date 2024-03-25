import { Meta, PaginationProps } from "@/@types";
import { ViewStates } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Category } from "./category";
import { Expert } from "./expert";
import { Module } from "./module";
import { Attachement, HashTag, HashTags } from "./note";
import { Organization } from "./organization";
import { Disease } from "./pathology";
import { Profession } from "./profession";
import { Speciality } from "./speciality";
import { BACKEND_ROUTES } from "@/enum";

export interface SerieProfession {
  serieId: 1;
  professionId: 3;
  profession: Profession;
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
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  SerieProfession: SerieProfession[];
  SerieReview: [];
  SerieModule: Module[];
  SerieExpert: SerieExpert[];
  SerieOrganization: SerieOrganization[];
  SeriePartner: SeriePartner[];
  SerieHashTag: HashTags[];
  certification: number;
  isBookmarked: boolean;
  isEnrolled: boolean;
  isFlagged: boolean;
  reviews: number;
  views: any;
  CategoryOnSerie: {
    categoryId: number;
    serieId: number;
    category: Category;
  }[];
  SpecialityOnSerie: {
    specialityId: number;
    serieId: number;
    speciality: Speciality;
  }[];
  DiseaseOnSerie: {
    diseaseId: number;
    serieId: number;
    disease: Disease;
  }[];
  status: ViewStates;
  reviewsCount: number;
  UserEnrollSerie: [];
  duration: number;
  _count: {
    SerieModule: number;
  };
  Attachement: Attachement[];
  progress: number | null;
  videoPath: string;
  videoSrc: string;
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
      }>(BACKEND_ROUTES.SERIE, {
        params: { page, perPage, sortBy, sortOrder },
      });
      return data.items;
    }
  );
}

export async function Bookmark_Serie(slug: string) {
  const data = await api.patch(`${BACKEND_ROUTES.SERIE_BOOKMARKING}/${slug}`);
  return data;
}

export async function Flag_Serie(slug: string) {
  const data = await api.patch(`${BACKEND_ROUTES.SERIE_FLAGGING}/${slug}}`);
  return data;
}

export async function Enroll_Serie(slug: string) {
  const data = await api.patch(`${BACKEND_ROUTES.SERIE_ENROLLING}/${slug}}`);
  return data;
}
