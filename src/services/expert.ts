import { Meta } from "@/@types";
import { Expert, api } from "@/api";
import { BACKEND_ROUTES } from "@/enum";
import { ErrorNotification, SuccessNotification } from "@/hooks";
import { Wording } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export async function FollowExpert(id: number) {
  await api.post(BACKEND_ROUTES.EXPERT_FOLLOW + "/" + id);
}

export const handleFollowing = async (id: number, isFollowed: boolean) => {
  try {
    await FollowExpert(id);
    SuccessNotification({
      message: !isFollowed
        ? "Expert non suivi avec succès"
        : "Expert suivi avec succès",
    });
  } catch (err) {
    ErrorNotification({
      message: Wording.error,
    }); 
  }
};

export function useGetEventExperts(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  eventId: number;
}) {
  return useQuery(["GET_EVENT_EXPERTS", params], async () => {
    const { data } = await api.get<{ items: Expert[]; meta: Meta }>(
      BACKEND_ROUTES.EXPERT,
      {
        params,
      }
    );
    return data;
  });
}
export function useGetOrganizationExperts(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  organizationId: number;
}) {
  return useQuery(["GET_ORAGNIZATION_EXPERTS", params], async () => {
    const { data } = await api.get<{ items: Expert[]; meta: Meta }>(
      BACKEND_ROUTES.EXPERT,
      {
        params,
      }
    );
    return data;
  });
}
export function useGetSerieExperts(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  serieId: number;
}) {
  return useQuery(["GET_SERI_EXPERTS", params], async () => {
    const { data } = await api.get<{ items: Expert[]; meta: Meta }>(
      BACKEND_ROUTES.EXPERT,
      {
        params,
      }
    );
    return data;
  });
}
