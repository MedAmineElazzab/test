export enum Pages {
  login_URL = "/auth/signin",
  Register_URL = "/users/signup",
}

export enum AttachmentType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  PDF = "PDF",
  WORD = "WORD",
  EXCEL = "EXCEL",
  POWERPOINT = "POWERPOINT",
  OTHER = "OTHER",
}

export enum STATIC {
  placeholder = "/assets/images/placeholder.png",
}
export enum COLORS {
  GRAY = "gray",
  RED = "red",
  PINK = "pink",
  GRAPE = "grape",
  VIOLET = "violet",
  INDIGO = "indigo",
  BLUE = "blue",
  CYAN = "cyan",
  GREEN = "green",
  LIME = "lime",
  YELLOW = "yellow",
  ORANGE = "orange",
  TEAL = "teal",
  DARK = "dark",
}

export const MantineColors: string[] = [
  COLORS.GRAY,
  COLORS.RED,
  COLORS.PINK,
  COLORS.GRAPE,
  COLORS.VIOLET,
  COLORS.INDIGO,
  COLORS.BLUE,
  COLORS.CYAN,
  COLORS.GREEN,
  COLORS.LIME,
  COLORS.YELLOW,
  COLORS.ORANGE,
  COLORS.TEAL,
  COLORS.DARK,
];

export type Level = "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4";

export enum LEVELS {
  LEVEL1 = "Fondamentaux",
  LEVEL2 = "Intermédiaire",
  LEVEL3 = "Avancé",
  LEVEL4 = "Expert",
}

export enum SignupStep {
  INIT = "INIT",
  SIGNUP = "SIGNUP",
  INFORMATION = "INFORMATION",
  INTERESTS = "INTERESTS",
  VERIFICATION = "VERIFICATION",
  DONE = "DONE",
}

export enum SignupStepNumbered {
  INIT = 0,
  SIGNUP = 1,
  INFORMATION = 2,
  INTERESTS = 3,
  VERIFICATION = 4,
  DONE = 5,
}

export enum ProfileCompletion {
  INIT = "INIT",
  VERIFIED = "VERIFIED",
  NOT_VERIFIED = "NOT_VERIFIED",
  FINISHED = "FINISHED",
  CAN_BROWSE = "CAN_BROWSE",
}

export enum TitleNameTranslate {
  Docteur = "Docteur",
  Professeur = "Professeur",
  Docteur_Pharmacie = "Docteur en Pharmacie",
  Doctor_Philosophy = "Doctor en Philosophie",
}
export enum TitleName {
  Docteur = "Docteur",
  Professeur = "Professeur",
  Docteur_Pharmacie = "Docteur_Pharmacie",
  Doctor_Philosophy = "Doctor_Philosophy",
}

export enum TitleAbbreviation {
  Docteur = "Dr.",
  Professeur = "Pr.",
  Docteur_Pharmacie = "Pharm.D",
  Doctor_Philosophy = "Ph.D",
}

export enum NoteType {
  DISPONIBILITE_DUN_MEDICAMENT = "Disponibilité d'un nouveau médicament",
  NOUVEAU_MEDICAMENT = "Nouveau médicament",
  MODIFICATION_DUN_MEDICAMENT_EXISTANT = "Modification d'un médicament existant",
  RETRAIT_DUN_MEDICAMENT = "Retrait d'un médicament",
  RAPPEL_DUN_MEDICAMENT = "Rappelle d'un médicament",
  MISE_A_JOUR_REGLEMENTAIRE = "Mis-à-jour reglementaire",
  RETRAIT_DAUTORISATION_DE_MISE_SUR_LE_MARCHE = "Retrait d'autorisation de mis sur le marché (AMM)",
  SANCTIONS_ET_LES_PENALITES_LIEES_A_LINDUSTRIE_PHARMACEUTIQUE = "Sanctions et les penalités liées a l'industrie pharmacetique ",
  RISQUES__MEDICAMENTEUX = "Risques médicamenteux",
  MISE_A_JOUR_DES_PRATIQUES_CLINIQUES = "Mise-à-jour des pratiques cliniques",
  NOUVELLE_RECHERCHE_DANS_LE_DOMAINE_MEDICALE_ET_PARMACEUTIQUE = "Nouvelle recherche dans le domaaine médicale et pharmacetique",
  NOUVELLES_PUBLICATIONS_SCIENTIFIQUES = "Nouvelles publications scientiiuqes",
}

export enum NoteTypeFields {
  produitConcerne = "Produit concerné",
  situationActuelle = "Situation actuelle",
  causeDeLaSituation = "Cause de la situation",
  impactPourLesProfessionnelsDeLaSante = "Impact pour  les professionnels de la santé",
  impactLesPatientsEtLesProfessionnels = "Impact sur les patients et les professionnels de la santé",
  mesurePrises = "Mesures prises",
  previsions = "Prévisions",
  alternativesPossibles = "Alternatives possibles",
  nomDuProduit = "Nom du produit",
  denominationCommuneInternationale = "Dénomination Commune Internationale (DCI)",
  laboratoirePharmaceutique = "Laboratoire pharmaceutique",
  indication = "Indication",
  mecanismeDaction = "Mécanisme d'action",
  efficaciteEtSecurite = "Efficacité et sécurité",
  comparaisonAvecLesTraitementsExistants = "Comparaison avec les traitements existants",
  effetsSecondairesEtPrecautions = "Effets secondaires et précautions",
  coutEtRemboursement = "Coût et remboursement",
  disponibilite = "Disponibilité",
  descriptionDeLaModification = "Description de la modification",
  raisonsDeLaModification = "Raisons de la modification",
  impactDeLaModification = "Impact de la modification",
  instructionsPourLesProfessionnelsDeLaSante = "Instructions pour les professionnels de la santé",
  raisonsDuRetrait = "Raisons du retrait",
  implicationsForProf = "Implication pour les professionnels de la santé",
  implicationsForPatient = "Implication pour les patients",
  descriptionDuRappel = "Description du rappel",
  impactSurLaDisponibiliteDuMedicament = "Impact sur la disponibilité du médicament",
  ressourcesSupplementaires = "Ressources supplémentaires",
  descriptionDeLaMiseAJourReglementaire = "Description de la mise à jour réglementaire",
  instructionsPourLaConformite = "Instructions pour la conformité",
  descriptionDuRetraitDeLAMM = "Description du retrait de l'AMM",
  descriptionDeLaSanctionOuDeLaPenalite = "Description de la sanction ou de la pénalité",
  descriptionDesRisque = "Description des risques",
  conditionOuMaladieConcernee = "Condition ou maladie concernée",
  DescriptioDeLaMiseAJourDePratiquesCliniques = "Description de la mise à jour des pratiques cliniques",
  instructionsPourLaMiseEnOuvre = "Instructions pour la mise en œuvre",
  descriptionDeLaRecherche = "Description de la recherche",
  limitationsDeLetude = "Limitations de l'étude",
  prochainesEtapes = "Prochaines étapes",
  titreDeLaPublication = "Titre de la publication",
  auteurs = "Auteurs",
  journalDePublication = "Journal de publication",
  descriptionDeLaPublication = "Description de la publication",
  impactPourLesPatients = "Impact pour les patients",
  instructionsPourLesPatients = "Instructions pour les patients",
}

export enum ModuleTitles {
  NOTE = "note",
  MODULE = "module",
  SERIE = "série",
  AGENDA = "Agenda",
  INSTITUTION = "Institution",
  EXPERT = "Expert",
}

export enum ModulesTitles {
  NOTES = "Notes",
  MODULES = "Modules",
  SERIES = "Séries",
  CERTIFICAT = "Cértificats",
  MASTERCLASS = "Masterclass",
  CONGRES = "Agenda",
  MEDICATION = "Médicaments",
  SIMULATION = "Simulations",
  EXPERTS = "Experts",
  AGENDAS = "AGENDAS",
  INSTITUTIONS = "Institutions",
  EVENTS = "Agenda",
}

export enum ModulesPathnames {
  NOTE = "/v2/notes",
  EXPERT = "/v2/experts",
  MODULE = "/v2/modules",
  INSTITUTION = "/v2/institutions",
  SERIE = "/v2/series",
  CERTIFICAT = "/v2/certificats",
  MASTERCLASS = "/v2/masterclass",
  CONGRES = "/v2/agendas",
  MEDICATION = "/v2/medications",
  SIMULATION = "/v2/simulations",
  REVIEW_NOTE = "/review/note",
  REVIEW_MODULE = "/review/module",
  REVIEW_SERIE = "/review/serie",
  REVIEW_NOTE_SLUG = "/review?noteSlug=",
  REVIEW_MODULE_SLUG = "/review?moduleSlug=",
  REVIEW_SERIE_SLUG = "/review?serieSlug=",
  EVENT = "/v2/agendas",
}

export enum ROUTES {
  "AUTH" = "/v2/auth",
  "INDEX" = "/v2",
  "REGISTER" = "/v2/auth/register",
}

export enum BACKEND_ROUTES {
  "GOOGLE_AUTH" = "/auth/google/token",
  "LINKEDIN_AUTH" = "/auth/linkedin/token",
  "REFRESH_TOKEN" = "/auth/refresh-token",
  "SERIE" = "/serie",
  "COUNTRY" = "/countries",
  "CITY" = "/cities/country",
  "EXPERT" = "/expert",
  "EXPERT_FOLLOW" = "/expert/follow",
  "INSTITUTION_FOLLOW" = "/organization/follow",
  "MODULE_BOOKMARK" = "/module/bookmark",
  "MODULE_FLAG" = "/module/flag",
  "MODULE" = "/module",
  "NOTE" = "/note",
  "EVENT" = "/event",
  "EVENT_BOOKMARK" = "/event/bookmark",
  "EVENT_FLAG" = "/event/flag",
  "EVENT_SNIPPET_BOOKMARK" = "/event/bookmark/snippet",
  "EVENT_SNIPPET_FLAG" = "/event/flag/snippet",
  "EVENT_SNIPPET" = "/event/snippet",
  "EVENT_TYPE" = "/eventType",
  "EVENT_VIDEO" = "/event/video",
  "REFRESH_EVENT" = "/event/refresh",
  "SERIE_BOOKMARKING" = "/serie/bookmark",
  "SERIE_FLAGGING" = "/serie/flag",
  "SERIE_ENROLLING" = "/serie/enroll",
  "INSTITUTION" = "/organization",
  "AUDIO" = "/note/audio",
  "NOTE_BOOKMARK" = "/note/bookmark",
}

export enum MENU_ITEMS {
  PROFILE_VIEW = "Voir le profil",
  SETTINGS = "Paramètres",
  FEED = "Flux d'activité",
  SUPPORT = "Support",
  LOGOUT = "Se déconnecter",
}

export enum LANGS {
  FR = "fr",
  EN = "en",
}

export enum VIDEO_PATHS {
  MODULE = "/module/video",
  SERIE = "/serie/video",
  EVENT = "/event/video"
}
export enum FILTER_OPTION {
  CATEGORY = "category",
  SPECIALITY = "speciality",
  DISEASE = "disease",
  DATE = "date",
  KEYWORDS = "keyWords",
  PROFILE = "profile",
  EVENT_TYPE = "eventType",
  DATE_RANGE = "dateRange",
  START_DATE = "startDate",
  END_DATE = "endDate",
}

export enum EventType {
  SimulationClinique = "Simulation Clinique",
  Colloque = "Colloque",
  Conference = "Conférence",
  Congres = "Congrès",
  CoursCertifiants = "Cours Certifiants",
  CoursEnLigneMassifOuvert = "Cours en Ligne Massif Ouvert (MOOC)",
  ExpositionScientifique = "Exposition Scientifique",
  Forum = "Forum",
  JourneesScientifiques = "Journées Scientifiques",
  ProgrammeDeMentorat = "Programme de Mentorat",
  RencontresDeReseautage = "Rencontres de Réseautage",
  RetraiteEducative = "Retraite Éducative",
  Salon = "Salon",
  SeancesDePoster = "Séances de Poster",
  SeminaireDeFormation = "Séminaire de Formation",
  SeminairesDeLeadership = "Séminaires de Leadership",
  Symposium = "Symposium",
  TableRonde = "Table Ronde",
  Webinaire = "Webinaire",
  Workshop = "Workshop",
}

export enum Calendar {
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  OUTLOOK = "OUTLOOK",
  YAHOO = "YAHOO",
}
