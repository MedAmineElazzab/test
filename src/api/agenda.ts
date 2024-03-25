import { eventType } from "@/@types";
import {
  Category,
  Country,
  Dci,
  Disease,
  Expert,
  HashTag,
  Medicine,
  Organization,
  Speciality,
  api,
} from "@/api";
import { BACKEND_ROUTES } from "@/enum";
import { useQuery } from "@tanstack/react-query";

export type EventDisease = {
  eventId: number;
  diseaseId: number;
  disease: Disease;
};
export type TimeSlot = {
  id: 1;
  dateTimeFrom: string;
  dateTimeTo: string;
};
export type Quote = {
  id: number;
  message: string;
  quotedBy: string;
};
export type OrginazerWord = {
  id: number;
  message: string;
  imagePath: string;
  qouteId: number;
  organization: Organization;
  quote: Quote;
};

export type EventSnippet = {
  id: number;
  title: string;
  message: string;
  startAt: number;
  endAt: number;
  duration: number;
  eventId: number;
  createdAt: Date;
  updatedAt: Date;
  imagePath : string;
};
export type EventType = {
  id: number;
  name: string;
  description: string;
};
export interface Agenda {
  id: number;
  title: string;
  slug: string;
  description: string;
  summary: string;
  joinLink: string;
  language: string;
  videoPath: string | null;
  imagePath: string | null;
  duration: number | null;
  isPublished: boolean;
  specialityId: number;
  categoryId: number;
  diseaseId: number;
  dciId: number;
  medicineId: number;
  cityId: number;
  timeSlotId: number;
  eventType: EventType;
  proffesionId: number;
  isStarted : boolean;
  isEnded : boolean;
  createdAt: Date;
  updatedAt: Date;
  isBookmarked: boolean;
  isRegistered: boolean;
  isFlagged: boolean;
  organizerWord: OrginazerWord;
  city: {
    id: number;
    name: string;
    countryId: number;
    createdAt: Date;
    updatedAt: Date;
    country: Country;
  };
  EventOrganization: {
    organizationId: number;
    eventId: number;
    message: string;
    organization: Organization;
  }[];
  EventDisease: {
    eventId: number;
    diseaseId: number;
    disease: Disease;
  }[];
  dci: Dci;
  category: Category;
  EventSpeciality: {
    eventId: number;
    specialityId: number;
    speciality: Speciality;
  }[];
  EventMedicine: Medicine;
  timeSlot: TimeSlot;
  EventExpert: {
    id: number;
    eventId: number;
    expertId: number;
    expert: Expert;
  }[];
  EventHashTag: {
    hashTag: HashTag;
    hashTagId: number;
    eventId: number;
  }[];
  EventSnippet: EventSnippet[];
  videoSrc: string | null;
}

export async function Bookmark_Event(slug: string) {
  await api.patch(`${BACKEND_ROUTES.EVENT_BOOKMARK}/${slug}`);
}

export async function Flag_Event(slug: string) {
  await api.patch(`${BACKEND_ROUTES.EVENT_FLAG}/${slug}`);
}

export function useGetEventTypes() {
  return useQuery(["GET_EVENT_TYPES"], async () => {
    const { data } = await api.get<eventType[]>(BACKEND_ROUTES.EVENT_TYPE);
    return data;
  });
}
