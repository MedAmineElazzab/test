import api from "./api";
import { Category } from "./category";
import { Dci } from "./dci";
import { Expert } from "./expert";
import { Medicine } from "./medicine";
import { Attachement, Review } from "./note";
import { Organization } from "./organization";
import { Disease } from "./pathology";
import { Serie } from "./serie";
import { Speciality } from "./speciality";
export interface Transcription {
  createdAt: string;
  filePath: string;
  id: number;
  language: "FR" | "AR" | "EN";
  type: "VIDEO" ;
  updatedAt: string;
  transcriptionJson: {
    id: number;
    text: string;
    endTime: number;
    startTime: number;
  }[];
}
export interface Module {
  id: number;
  slug: string;
  title: string;
  videoSrc: string;
  videoThumbnailPath: string;
  description: string;
  objective: string;
  language: string;
  imagePath: string;
  videoPath: string;
  serieId: number;
  specialityId: number;
  categoryId: number;
  medicineId: number;
  note: string;
  dciId: number;
  isDisliked: boolean;
  isLiked: boolean;
  isCompleted : boolean;
  isFlagged: boolean;
  speciality: Speciality;
  pathologyId: number;
  disease: Disease;
  category: Category;
  medicine: Medicine;
  dci: Dci;
  duration: number;
  createdAt: string;
  updatedAt: string;
  ModuleReview: {
    moduleId: 1;
    reviewId: 1;
    review: Review;
  }[];
  ModuleOrganization: {
    moduleId: number;
    organizationId: number;
    organization: Organization;
  }[];
  ModulePartner: {
    moduleId: number;
    organizationId: number;
    organization: Organization;
  }[];
  serie: Serie;
  moduleExpert: {
    expert ?: Expert;
    expertId: number;
    moduleId: number;
    id: number;
  };
  Attachement: Attachement[];
  isBookmarked: boolean;
  reviewsCount: number;
  reviews: number;
  Transcription: Transcription[];
}

export async function Bookmark_Module(slug: string) {
  const data = await api.patch(`/module/bookmark/${slug}`);
  return data;
}

export async function Flag_Module(slug: string) {
  const data = await api.patch(`/module/flag/${slug}`);
  return data;
}

export async function Like_Module(slug: string) {
  const data = await api.patch(`/module/like/${slug}`);
  return data;
}
export async function DisLike_Module(slug: string) {
  const data = await api.patch(`/module/dislike/${slug}`);
  return data;
}
