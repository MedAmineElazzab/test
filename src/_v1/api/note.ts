import { Meta, PaginationProps } from "@/@types";
import { AttachmentType } from "@/_v1/enum";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Category } from "./category";
import { Dci } from "./dci";
import { Expert } from "./expert";
import { Label } from "./label";
import { Medicine } from "./medicine";
import { Organization } from "./organization";
import { Disease } from "./pathology";
import { Speciality } from "./speciality";
export interface noteType {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}
export interface Attachement {
  id: number;
  name: string;
  size: string;
  path: string;
  noteId: number;
  noteExpertNoteId: number;
  noteExpertExpertId: number;
  createdAt: string;
  updatedAt: string;
  masterClassId: number;
  userId: number;
  serieId: number;
  moduleId: number;
  type: AttachmentType;
}
export interface Review {
  id: number;
  rate: number;
  text: string;
  email: string;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
export interface NoteHashTag {
  hashTag: HashTag;
  hashTagId: number;
  noteId: number;
}
[];
export interface noteLevel {
  name?: string;
  color?: string;
  id?: number;
}
export interface HashTag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface Note {
  id: number;
  title: string;
  language: string;
  noteLevel: {
    name: string;
    color: string;
  };
  date?: Date;
  summary: string;
  content: string;
  source: string;
  slug: string;
  specialityId: number;
  categoryId: number;
  diseaseId: number;
  dciId: number;
  medicineId: number;
  speciality: Speciality;
  category: Category;
  disease: Disease;
  medicine: Medicine;
  dci: Dci;
  isBookmarked: boolean;
  isFlagged: boolean;
  dateOfPublication: string | null;
  implicationsForProf: string | null;
  implicationsForPatient: string | null;
  medicationAvailability: string | null;
  newMedication: string | null;
  modificationOfMedication: string | null;
  withdrawalOfMedication: string | null;
  medicationRecall: string | null;
  regulatoryUpdate: string | null;
  withdrawalOfMarketAuth: string | null;
  sanctionsAndPenalties: string | null;
  medicationRisks: string | null;
  clinicalPracticeUpdate: string | null;
  newMedicalResearch: string | null;
  newScientificPublication: string | null;
  ModulePartner: {
    noteId: number;
    organizationId: number;
    organization: Organization;
  }[];
  NoteOrganization: {
    noteId: number;
    organizationId: number;
    organization: Organization;
  }[];
  NoteHashTag: {
    hashTag: HashTag;
    hashTagId: number;
    noteId: number;
  }[];
  Attachement: Attachement[];
  noteExpert: {
    noteId: number;
    expertId: number;
    type: string;
    expert: Expert;
    isBookmarked: boolean;
    audioSrc: string;
    Attatchement: {
      id: number;
      name: string;
      size: number;
      path: string;
      type: "AUDIO" | "VIDEO";
      noteId: number;
      noteExpertNoteId: number;
      noteExpertExpertId: number;
      createdAt: string;
      updatedAt: string;
      masterClassId: number;
      userId: number;
      serieId: number;
      moduleId: number;
    };
  };
  NoteLabel: {
    noteId: number;
    labelId: number;
    color: string;
    label: Label;
  }[];
  noteType: {
    id: number;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  views: number;
  reviews: {
    noteId: number;
    review: Review;
    reviewId: number;
  }[];
  expert: any;
  tags: any;
}
export interface NotePatched {
  id?: 1;
  title?: string;
  language?: string;
  noteLevel?: {
    name?: string;
    color?: string;
  };
  summary?: string;
  content?: string;
  source?: string;
  slug?: string;
  specialityId?: number;
  categoryId?: number;
  diseaseId?: number;
  dciId?: number;
  medicineId?: number;
  speciality?: Speciality;
  category?: Category;
  disease?: Disease;
  medicine?: Medicine;
  dci?: Dci;
  isFlagged?: boolean;
  isBookmarked?: boolean;
  NoteOrganization?: {
    noteId?: number;
    organizationId?: number;
    organization?: Organization;
  }[];
  NoteHashTag?: string[];
  Attachement?: string[];
  noteExpert?: {
    noteId?: number;
    expertId?: number;
    type?: string;
    expert?: Expert;
    Attachement?: string[];
  }[];
  NoteLabel?: {
    noteId?: number;
    labelId?: number;
    color?: string;
    label?: Label;
  }[];
  noteType?: {
    id?: number;
    name?: string;
    color?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface NoteExpert {
  noteId: number;
  expertId: number;
  type: string;
  expert: Expert;
  isBookmarked: boolean;
  audioSrc: string;
  imagePath: string;
  isFollowed : boolean;
  Attatchement: {
    id: number;
    name: string;
    size: number;
    path: string;
    type: "AUDIO" | "VIDEO";
    noteId: number;
    noteExpertNoteId: number;
    noteExpertExpertId: number;
    createdAt: string;
    updatedAt: string;
    masterClassId: number;
    userId: number;
    serieId: number;
    moduleId: number;
  };
}

export function useGetNotes({
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
      ? ["GET_NOTES"]
      : [
          "GET_NOTES",
          "page : " + page,
          "perPage : " + perPage,
          "sortBy : " + sortBy,
          "sortOrder : " + sortOrder,
        ],
    async () => {
      const { data } = await api.get<{
        items: Note[];
        meta: Meta;
      }>(`/note`, {
        params: { page, perPage, sortBy, sortOrder },
      });
      return data.items;
    }
  );
}
export async function Bookmark_Note(slug: string) {
  const data = await api.patch(`/note/bookmark/${slug}`);
  return data;
}

export async function Flag_Note(slug: string) {
  const data = await api.patch(`/note/flag/${slug}`);
  return data;
}

export async function Bookmark_Note_Expert(slug: string) {
  const data = await api.patch(`/note/bookmark/expert/${slug}`);
  return data;
}
