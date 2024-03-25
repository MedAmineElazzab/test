import { Meta } from "@/@types";
import { Organization, api } from "@/api";
import { BACKEND_ROUTES } from "@/enum";
import { ErrorNotification, SuccessNotification } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export async function FollowINST(id: number) {
  const data = await api.post(BACKEND_ROUTES.INSTITUTION_FOLLOW + `/${id}`);
  return data;
}

export const handleFollowingInstitution = async (
  id: number,
  isFollowed: boolean
) => {
  try {
    await FollowINST(id);
    SuccessNotification({
      message: !isFollowed
        ? "Institution non suivi avec succès"
        : "Institution suivi avec succès",
    });
  } catch (error: any) {
    ErrorNotification({
      message: error.message,
    });
  }
};

export function useGetExpertInstitutions(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  expertId: number;
}) {
  return useQuery(["GET_EXPERT_INSTITUTIONS", params], async () => {
    const { data } = await api.get<{ items: Organization[]; meta: Meta }>(
      BACKEND_ROUTES.INSTITUTION,
      {
        params,
      }
    );
    return data;
  });
}

export function useGetEventInstitutions(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  eventId: number;
}) {
  return useQuery(["GET_EVENT_INSTITUTIONS", params], async () => {
    const { data } = await api.get<{ items: Organization[]; meta: Meta }>(
      BACKEND_ROUTES.INSTITUTION,
      {
        params,
      }
    );
    return data;
  });
}
