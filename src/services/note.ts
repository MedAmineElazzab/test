import { Meta } from "@/@types";
import { Bookmark_Note, Flag_Note, Note, api } from "@/api";
import { BACKEND_ROUTES } from "@/enum";
import { ErrorNotification, SuccessNotification } from "@/hooks";
import { Wording } from "@/lib";
import { useQuery } from "@tanstack/react-query";
export const onBookMarkNotesBySlug = async (slug: string) => {
  try {
    return await api.patch(BACKEND_ROUTES.NOTE_BOOKMARK + "/" + slug);
  } catch (err) {
    ErrorNotification({
      message: Wording.error,
    }); 
   }
};

export const handleNoteBokmarking = async (slug: string, isSaved: boolean) => {
  try {
    await Bookmark_Note(slug);
    SuccessNotification({
      message: isSaved
        ? "vous avez correctement supprimé la note de vos signets"
        : "vous avez ajouté cette note à vos signets.",
    });
  } catch (err) {
    ErrorNotification({
      message: Wording.error,
    });
  }
};

export const handleNoteFlagging = async (slug: string, isSaved: boolean) => {
  try {
    await Flag_Note(slug);
    SuccessNotification({
      message: isSaved
        ? "Note non signalée avec success"
        : "Note signalée avec success",
    });
  } catch (err) {
    ErrorNotification({
      message: Wording.error,
    }); 
  }
};

export function useGetOrganizationNotes(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  organizationId: number;
}) {
  return useQuery(["GET_ORGANIZATION_NOTES", params], async () => {
    const { data } = await api.get<{ items: Note[]; meta: Meta }>(
      BACKEND_ROUTES.NOTE,
      {
        params,
      }
    );
    return data;
  });
}
export function useGetExpertNotes(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  expertId: number;
}) {
  return useQuery(["GET_EXPERT_NOTES", params], async () => {
    const { data } = await api.get<{ items: Note[]; meta: Meta }>(
      BACKEND_ROUTES.NOTE,
      {
        params,
      }
    );
    return data;
  });
}
