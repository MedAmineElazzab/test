import { Meta } from "@/@types";
import { Agenda, Bookmark_Event, EventSnippet, Flag_Event, api } from "@/api";
import { BACKEND_ROUTES } from "@/enum";
import { ErrorNotification, SuccessNotification } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const handleEventBokmarking = async (slug: string, isSaved: boolean) => {
  try {
    await Bookmark_Event(slug);
    SuccessNotification({
      message: isSaved
        ? "vous avez correctement supprimé l'événement de vos signets"
        : "vous avez ajouté cette événement à vos signets.",
    });
  } catch (error: any) {
    ErrorNotification({
      message: error.message,
    });
  }
};

export const handleEventFlagging = async (slug: string, isSaved: boolean) => {
  try {
    await Flag_Event(slug);
    SuccessNotification({
      message: isSaved
        ? "Événement non signalée avec success"
        : "Événement signalée avec success",
    });
  } catch (error: any) {
    ErrorNotification({
      message: error.message,
    });
  }
};

export function useGetExpertEvents(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  expertId: number;
}) {
  return useQuery(["GET_EXPERT_EVENTS", params], async () => {
    const { data } = await api.get<{ items: Agenda[]; meta: Meta }>(
      BACKEND_ROUTES.EVENT,
      {
        params,
      }
    );
    return data;
  });
}

export function useGetInstitutionEvents(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  organizationId: number;
}) {
  return useQuery(["GET_INSTITUTION_EVENTS", params], async () => {
    const { data } = await api.get<{ items: Agenda[]; meta: Meta }>(
      BACKEND_ROUTES.EVENT,
      {
        params,
      }
    );
    return data;
  });
}

export function useGetEventSnippets(
  params: {
    page: number;
    perPage: number;
    sortBy?: "createdAt" | "updatedAt" | "id";
    sortOrder?: "desc" | "asc";
  },
  eventId: number
) {
  return useQuery(["GET_EVENT_SNIPPETS", params, eventId], async () => {
    const { data } = await api.get<{ items: EventSnippet[]; meta: Meta }>(
      BACKEND_ROUTES.EVENT_SNIPPET + "/" + eventId,
      {
        params,
      }
    );
    return data;
  });
}

