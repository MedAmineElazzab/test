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
  GRAY = 'gray',
  RED = 'red',
  PINK = 'pink',
  GRAPE = 'grape',
  VIOLET = 'violet',
  INDIGO = 'indigo',
  BLUE = 'blue',
  CYAN = 'cyan',
  GREEN = 'green',
  LIME = 'lime',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  TEAL = 'teal',
  DARK = 'dark',
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

export enum NoteType {
  DISPONIBILITE_DUN_MEDICAMENT = "Disponibilité d'un nouveau médicament",
  NOUVEAU_MEDICAMENT = 'Nouveau médicament',
  MODIFICATION_DUN_MEDICAMENT_EXISTANT = "Modification d'un médicament existant",
  RETRAIT_DUN_MEDICAMENT = "Retrait d'un médicament",
  RAPPEL_DUN_MEDICAMENT = "Rappelle d'un médicament",
  MISE_A_JOUR_REGLEMENTAIRE = 'Mis-à-jour reglementaire',
  RETRAIT_DAUTORISATION_DE_MISE_SUR_LE_MARCHE = "Retrait d'autorisation de mis sur le marché (AMM)",
  SANCTIONS_ET_LES_PENALITES_LIEES_A_LINDUSTRIE_PHARMACEUTIQUE = "Sanctions et les penalités liées a l'industrie pharmacetique ",
  RISQUES__MEDICAMENTEUX = 'Risques médicamenteux',
  MISE_A_JOUR_DES_PRATIQUES_CLINIQUES = 'Mise-à-jour des pratiques cliniques',
  NOUVELLE_RECHERCHE_DANS_LE_DOMAINE_MEDICALE_ET_PARMACEUTIQUE = 'Nouvelle recherche dans le domaaine médicale et pharmacetique',
  NOUVELLES_PUBLICATIONS_SCIENTIFIQUES = 'Nouvelles publications scientiiuqes',
}
