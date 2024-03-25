import { Meta } from "@/@types";
import { Comment, api } from "@/api";
import { ModuleTitles, ModulesPathnames } from "@/enum";
import { useQuery } from "@tanstack/react-query";

export function useGetReviews(
  slug: string,
  type: ModuleTitles,
  params: {
    page: number;
    perPage: number;
    sortBy?: "createdAt" | "updatedAt" | "id";
    sortOrder?: "desc" | "asc";
  }
) {
  const { page, perPage } = params;
  var path = "";
  switch (type) {
    case ModuleTitles.MODULE:
      path = ModulesPathnames.REVIEW_MODULE_SLUG + slug;
      break;
    case ModuleTitles.NOTE:
      path = ModulesPathnames.REVIEW_NOTE_SLUG + slug;
      break;
    case ModuleTitles.SERIE:
      path = ModulesPathnames.REVIEW_SERIE_SLUG + slug;
      break;
  }

  if (!path) {
    throw new Error("Invalid type provided");
  }

  return useQuery(["GET_REVIEWS", slug, page, perPage], async () => {
    const { data } = await api.get<{
      items: Comment[];
      meta: Meta;
      currentUser: Comment;
    }>(path, { params });
    return data;
  });
}
