import { Meta, PaginationProps } from "@/@types";
import { AttachmentType } from "@/_v1/enum";
import { Level } from "@/enum";
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
export type noteTypes =
  | "DISPONIBILITE_DUN_MEDICAMENT"
  | "NOUVEAU_MEDICAMENT"
  | "MODIFICATION_DUN_MEDICAMENT_EXISTANT"
  | "RETRAIT_DUN_MEDICAMENT"
  | "RAPPEL_DUN_MEDICAMENT"
  | "MISE_A_JOUR_REGLEMENTAIRE"
  | "RETRAIT_DAUTORISATION_DE_MISE_SUR_LE_MARCHE"
  | "SANCTIONS_ET_LES_PENALITES_LIEES_A_LINDUSTRIE_PHARMACEUTIQUE"
  | "RISQUES__MEDICAMENTEUX"
  | "MISE_A_JOUR_DES_PRATIQUES_CLINIQUES"
  | "NOUVELLE_RECHERCHE_DANS_LE_DOMAINE_MEDICALE_ET_PARMACEUTIQUE"
  | "NOUVELLES_PUBLICATIONS_SCIENTIFIQUES";


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
export interface HashTags {
  hashTag : HashTag
}
export interface noteLevel {
  name?: string;
  color?: string;
  bgColor?: string;
  id?: number;
}
export interface HashTag {
  bgColor: string;
  color: string;
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}
type Props = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  isBookmarked: boolean;
  tags?: any;
  disease?: [];
  NoteDisease: {
    noteId: number;
    diseaseId: number;
    disease: Disease;
  }[];
  // noteLevel?: {
  //   name: string;
  // };
  noteType?: string;
  expert?: any;
  noteExpert: ExpertType;
  SpecialityOnNote: {
    speciality: Speciality;
    noteId: number;
    specialityId: number;
  }[];
  NoteLabel: {
    label: Label;
    noteId: number;
    labelId: number;
  }[];
  noteLevel: Level;
  category: Category[];
};
export interface Note {
  id: number;
  title: string;
  language: string;
  summary: string;
  content: string;
  source: string;
  slug: string;
  specialityId: number;
  NoteDisease: {
    noteId: number;
    diseaseId: number;
    disease: Disease;
  }[];
  SpecialityOnNote: {
    speciality: Speciality;
    noteId: number;
    specialityId: number;
  }[];
  NoteLabel: {
    label: Label;
    noteId: number;
    labelId: number;
  }[];
  noteLevel: {
    id: number;
    name: string;
    color: string;
    bgColor: string;
    createdAt: string;
    updatedAt: string;
  };
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

  expertIsFollowed: boolean;
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
  NoteHashTag: HashTags[]
  Attachement: Attachement[];
  noteType: noteTypes
  createdAt: string;
  updatedAt: string;
  views: number;
  reviews: {
    noteId: number;
    review: Review;
    reviewId: number;
  }[];
  expert: Expert;
  noteExpert: NoteExpertType;
  tags: any;
  produitConcerne?: string;
  situationActuelle?: string;
  causeDeLaSituation?: string;
  impactLesPatientsEtLesProfessionnels?: string;
  mesurePrises?: string;
  previsions?: string;
  alternativesPossible?: string;
  nomDuProduit?: string;
  denominationCommuneInternationale?: string;
  laboratoirePharmaceutique?: string;
  indication?: string;
  mecanismeDaction?: string;
  efficaciteEtSecurite?: string;
  comparaisonAvecLesTraitementsExistants?: string;
  effetsSecondairesEtPrecautions?: string;
  coutEtRemboursement?: string;
  disponibilite?: string;
  descriptionDeLaModification?: string;
  raisonsDeLaModification?: string;
  impactDeLaModification?: string;
  raisonsDuRetrait?: string;
  alternativesPossibles?: string;
  ressourcesSupplementaires?: string;
  descriptionDuRappel?: string;
  instructionsPourLesProfessionnelsDeLaSante?: string;
  instructionsPourLesPatients?: string;
  impactSurLaDisponibiliteDuMedicament?: string;
  descriptionDeLaMiseAJourReglementaire?: string;
  instructionsPourLaConformite?: string;
  descriptionDuRetraitDeLAMM?: string;
  descriptionDeLaSanctionOuDeLaPenalite?: string;
  conditionOuMaladieConcernee?: string;
  DescriptioDeLaMiseAJourDePratiquesCliniques?: string;
  impactPourLesProfessionnelsDeLaSante?: string;
  impactPourLesPatients?: string;
  instructionsPourLaMiseEnOuvre?: string;
  descriptionDeLaRecherche?: string;
  limitationsDeLetude?: string;
  prochainesEtapes?: string;
  titreDeLaPublication?: string;
  auteurs?: string;
  journalDePublication?: string;
  descriptionDeLaPublication?: string;
  descriptionDesRisque?: string;
  implicationsForProf?: string;
  implicationsForPatient?: string;
  medicationAvailability?: string;
  newMedication?: string;
  modificationOfMedication?: string;
  withdrawalOfMedication?: string;
  medicationRecall?: string;
  regulatoryUpdate?: string;
  withdrawalOfMarketAuth?: string;
  sanctionsAndPenalties?: string;
  medicationRisks?: string;
  clinicalPracticeUpdate?: string;
  newMedicalResearch?: string;
  newScientificPublication?: string;
  dateOfPublication: string;
}

type ExpertType = {
  expert: {
    id: number;
    firstName: string;
    lastName: string;
    language: string;
    professionId: number;
    note: string;
    imagePath: string;
  };
};
export interface NoteExpertType {
  noteId: number;
  expertId: number;
  type: string;
  expert: Expert;
  isBookmarked: boolean;
  audioSrc: string;
  imagePath: string;
  isFollowed: boolean;
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
  NoteExpert?: {
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
