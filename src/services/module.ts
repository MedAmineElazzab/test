import { Meta } from "@/@types";
import { api } from "@/api";
import { BACKEND_ROUTES } from "@/enum";
import { ErrorNotification, SuccessNotification } from "@/hooks";
import { Wording } from "@/lib";
import { Module } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

export async function Bookmark_Module(slug: string) {
  await api.patch(BACKEND_ROUTES.MODULE_BOOKMARK + "/" + slug);
}
export async function Flag_Module(slug: string) {
  await api.patch(BACKEND_ROUTES.MODULE_FLAG + "/" + slug);
}

export const handleModuleBokmarking = async (
  slug: string,
  isSaved: boolean
) => {
  try {
    await Bookmark_Module(slug);
    SuccessNotification({
      message: isSaved
        ? "vous avez correctement supprimé le module de vos signets"
        : "vous avez ajouté ce module à vos signets.",
    });
  } catch (err) {
    ErrorNotification({
      message: Wording.error,
    }); 
  }
};

export const handleModuleFlagging = async (slug: string, isSaved: boolean) => {
  try {
    await Flag_Module(slug);
    SuccessNotification({
      message: isSaved
        ? "module non signalé avec success"
        : "module signalé avec success",
    });
  } catch (err) {
    ErrorNotification({
      message: Wording.error,
    }); 
  }
};

export function useGetSerieModules(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  seriesId: number;
}) {
  return useQuery(["GET_SERIE_MODULES", params], async () => {
    const { data } = await api.get<{ items: Module[]; meta: Meta }>(
      BACKEND_ROUTES.MODULE,
      {
        params,
      }
    );
    return data;
  });
}

export function useGetExpertModules(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  expertId: number;
}) {
  return useQuery(["GET_EXPERT_MODULES", params], async () => {
    const { data } = await api.get<{ items: Module[]; meta: Meta }>(
      BACKEND_ROUTES.MODULE,
      {
        params,
      }
    );
    return data;
  });
}


export function useGetOrganizationModules(params: {
  page: number;
  perPage: number;
  sortBy?: "createdAt" | "updatedAt" | "id";
  sortOrder?: "desc" | "asc";
  organizationId: number;
}) {
  return useQuery(["GET_ORAGNIZATION_MODULES", params], async () => {
    const { data } = await api.get<{ items: Module[]; meta: Meta }>(
      BACKEND_ROUTES.MODULE,
      {
        params,
      }
    );
    return data;
  });
}

