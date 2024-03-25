import { Category, Disease, HashTag, Organization, Speciality } from "@/api";
import { AttachmentType, Level } from "@/enum";
import { Expert } from ".";
export interface Partner {
  organization: Organization;
}
export interface Module {
  id: number;
  slug: string;
  title: string;
  imagePath: string;
  level: Level;
  status: ViewStates;
  duration: number;
  description: string;
  objective: string;
  isBookmarked: boolean;
  isFlagged: boolean;
  createdAt: string;
  reviewsCount: number;
  views: number;
  videoSrc: string;
  VideoTrack: {
    videoProgress: number;
  };
  CategoryOnModule: {
    categoryId: number;
    moduleId: number;
    category: Category;
  }[];
  SpecialityOnModule: {
    specialityId: number;
    moduleId: number;
    speciality: Speciality;
  }[];
  DiseaseOnModule: {
    diseaseId: number;
    moduleId: number;
    disease: Disease;
  }[];
  moduleExpert: {
    id: number;
    moduleId: number;
    expertId: number;
    text: number;
    isFollowed: boolean;
    expert: Expert;
  };
  ModulePartner: {
    moduleId: number;
    organizationId: number;
    organization: Organization;
  }[];
  ModuleOrganization : {
    moduleId: number;
    organizationId: number;
    organization: Organization;
  }[]
  Attachement: Attachement[];
  Transcription: Transcription[];
  serie: {
    id: number;
    SerieModule: SerieModule[];
  };
  ModuleHashTag: {
    moduleId: number;
    hashTagId: number;
    hashTag: HashTag;
  }[];
}
export interface Transcription {
  createdAt: string;
  filePath: string;
  id: number;
  language: "FR" | "AR" | "EN";
  type: "VIDEO";
  updatedAt: string;
  transcriptionJson: {
    id: number;
    text: string;
    endTime: number;
    startTime: number;
  }[];
}

export type ViewStates = "completed" | "inProgress" | "viewed" | "notStarted";



export interface SerieModule {
  id: number;
  slug: string;
  title: string;
  description: string;
  objective: string;
  language: string;
  imagePath: string | null;
  videoPath: string;
  videoThumbnailPath: string;
  isPublished: boolean;
  serieId: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
  level: string;
  videoProgress: number;
  status: ViewStates;
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

