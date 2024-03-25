import { Note } from "@/api";
import { NoteTypeFields } from "@/enum";
import { useEffect, useState } from "react";

export type FieldType = {
  name: keyof typeof NoteTypeFields;
  value: string | undefined;
};

export function useNoteDetails({
  noteType,
  produitConcerne,
  situationActuelle,
  causeDeLaSituation,
  impactPourLesProfessionnelsDeLaSante,
  mesurePrises,
  previsions,
  alternativesPossibles,
  nomDuProduit,
  denominationCommuneInternationale,
  laboratoirePharmaceutique,
  indication,
  mecanismeDaction,
  efficaciteEtSecurite,
  comparaisonAvecLesTraitementsExistants,
  effetsSecondairesEtPrecautions,
  coutEtRemboursement,
  disponibilite,
  raisonsDuRetrait,
  implicationsForPatient,
  ressourcesSupplementaires,
  descriptionDuRappel,
  instructionsPourLesPatients,
  instructionsPourLaConformite,
  instructionsPourLaMiseEnOuvre,
  instructionsPourLesProfessionnelsDeLaSante,
  titreDeLaPublication,
  impactLesPatientsEtLesProfessionnels,
  impactSurLaDisponibiliteDuMedicament,
  implicationsForProf,
  descriptionDeLaMiseAJourReglementaire,
  descriptionDeLaPublication,
  descriptionDeLaRecherche,
  descriptionDeLaSanctionOuDeLaPenalite,
  descriptionDesRisque,
  descriptionDuRetraitDeLAMM,
  conditionOuMaladieConcernee,
  DescriptioDeLaMiseAJourDePratiquesCliniques,
  limitationsDeLetude,
  auteurs,
  journalDePublication,
  impactPourLesPatients,
  prochainesEtapes,
  descriptionDeLaModification,
  raisonsDeLaModification,
  impactDeLaModification,
  
  slug,
}: Note) {
  const [dataToShow, setDataToShow] = useState<FieldType[]>([]);
  useEffect(() => {
    switch (noteType) {
      case "DISPONIBILITE_DUN_MEDICAMENT":
        setDataToShow([
          { name: "produitConcerne", value: produitConcerne },
          { name: "situationActuelle", value: situationActuelle },
          { name: "causeDeLaSituation", value: causeDeLaSituation },
          {
            name: "impactLesPatientsEtLesProfessionnels",
            value: impactLesPatientsEtLesProfessionnels,
          },
          { name: "mesurePrises", value: mesurePrises },
          { name: "previsions", value: previsions },
          { name: "alternativesPossibles", value: alternativesPossibles },
        ]);
        break;
      case "NOUVEAU_MEDICAMENT":
        setDataToShow([
          { name: "produitConcerne", value: produitConcerne },
          { name: "nomDuProduit", value: nomDuProduit },
          {
            name: "denominationCommuneInternationale",
            value: denominationCommuneInternationale,
          },
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          { name: "indication", value: indication },
          { name: "mecanismeDaction", value: mecanismeDaction },
          { name: "efficaciteEtSecurite", value: efficaciteEtSecurite },
          {
            name: "comparaisonAvecLesTraitementsExistants",
            value: comparaisonAvecLesTraitementsExistants,
          },
          {
            name: "effetsSecondairesEtPrecautions",
            value: effetsSecondairesEtPrecautions,
          },
          { name: "coutEtRemboursement", value: coutEtRemboursement },
          { name: "disponibilite", value: disponibilite },
        ]);
        break;
      case "MODIFICATION_DUN_MEDICAMENT_EXISTANT":
        setDataToShow([
          { name: "produitConcerne", value: produitConcerne },
          { name: "nomDuProduit", value: nomDuProduit },
          {
            name: "denominationCommuneInternationale",
            value: denominationCommuneInternationale,
          },
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          {
            name: "descriptionDeLaModification",
            value: descriptionDeLaModification,
          },
          { name: "raisonsDeLaModification", value: raisonsDeLaModification },
          { name: "impactDeLaModification", value: impactDeLaModification },
          {
            name: "instructionsPourLesProfessionnelsDeLaSante",
            value: instructionsPourLesProfessionnelsDeLaSante,
          },
          { name: "coutEtRemboursement", value: coutEtRemboursement },
          { name: "disponibilite", value: disponibilite },
        ]);
        break;
      case "RETRAIT_DUN_MEDICAMENT":
        setDataToShow([
          { name: "nomDuProduit", value: nomDuProduit },
          {
            name: "denominationCommuneInternationale",
            value: denominationCommuneInternationale,
          },
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          { name: "raisonsDuRetrait", value: raisonsDuRetrait },
          { name: "implicationsForProf", value: implicationsForProf },
          { name: "implicationsForPatient", value: implicationsForPatient },
          { name: "alternativesPossibles", value: alternativesPossibles },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "RAPPEL_DUN_MEDICAMENT":
        setDataToShow([
          { name: "nomDuProduit", value: nomDuProduit },
          {
            name: "denominationCommuneInternationale",
            value: denominationCommuneInternationale,
          },
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          { name: "descriptionDuRappel", value: descriptionDuRappel },
          {
            name: "instructionsPourLesProfessionnelsDeLaSante",
            value: instructionsPourLesProfessionnelsDeLaSante,
          },
          {
            name: "instructionsPourLesPatients",
            value: instructionsPourLesPatients,
          },
          {
            name: "impactSurLaDisponibiliteDuMedicament",
            value: impactSurLaDisponibiliteDuMedicament,
          },
          { name: "alternativesPossibles", value: alternativesPossibles },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "MISE_A_JOUR_REGLEMENTAIRE":
        setDataToShow([
          {
            name: "descriptionDeLaMiseAJourReglementaire",
            value: descriptionDeLaMiseAJourReglementaire,
          },
          { name: "implicationsForProf", value: implicationsForProf },
          { name: "implicationsForPatient", value: implicationsForPatient },
          {
            name: "instructionsPourLaConformite",
            value: instructionsPourLaConformite,
          },
          { name: "alternativesPossibles", value: alternativesPossibles },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "RETRAIT_DAUTORISATION_DE_MISE_SUR_LE_MARCHE":
        setDataToShow([
          { name: "nomDuProduit", value: nomDuProduit },
          {
            name: "denominationCommuneInternationale",
            value: denominationCommuneInternationale,
          },
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          {
            name: "descriptionDuRetraitDeLAMM",
            value: descriptionDuRetraitDeLAMM,
          },
          {
            name: "instructionsPourLesProfessionnelsDeLaSante",
            value: instructionsPourLesProfessionnelsDeLaSante,
          },
          {
            name: "instructionsPourLesPatients",
            value: instructionsPourLesPatients,
          },
          {
            name: "impactSurLaDisponibiliteDuMedicament",
            value: impactSurLaDisponibiliteDuMedicament,
          },
          { name: "alternativesPossibles", value: alternativesPossibles },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "SANCTIONS_ET_LES_PENALITES_LIEES_A_LINDUSTRIE_PHARMACEUTIQUE":
        setDataToShow([
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          {
            name: "descriptionDeLaSanctionOuDeLaPenalite",
            value: descriptionDeLaSanctionOuDeLaPenalite,
          },
          { name: "implicationsForProf", value: implicationsForProf },
          { name: "implicationsForPatient", value: implicationsForPatient },
          {
            name: "instructionsPourLaConformite",
            value: instructionsPourLaConformite,
          },
          { name: "alternativesPossibles", value: alternativesPossibles },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "RISQUES__MEDICAMENTEUX":
        setDataToShow([
          { name: "nomDuProduit", value: nomDuProduit },
          {
            name: "denominationCommuneInternationale",
            value: denominationCommuneInternationale,
          },
          {
            name: "laboratoirePharmaceutique",
            value: laboratoirePharmaceutique,
          },
          { name: "descriptionDesRisque", value: descriptionDesRisque },
          { name: "implicationsForProf", value: implicationsForProf },
          { name: "implicationsForPatient", value: implicationsForPatient },
          { name: "alternativesPossibles", value: alternativesPossibles },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "MISE_A_JOUR_DES_PRATIQUES_CLINIQUES":
        setDataToShow([
          {
            name: "conditionOuMaladieConcernee",
            value: conditionOuMaladieConcernee,
          },
          {
            name: "DescriptioDeLaMiseAJourDePratiquesCliniques",
            value: DescriptioDeLaMiseAJourDePratiquesCliniques,
          },
          {
            name: "impactPourLesProfessionnelsDeLaSante",
            value: impactPourLesProfessionnelsDeLaSante,
          },
          { name: "impactPourLesPatients", value: impactPourLesPatients },
          {
            name: "instructionsPourLaMiseEnOuvre",
            value: instructionsPourLaMiseEnOuvre,
          },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "NOUVELLE_RECHERCHE_DANS_LE_DOMAINE_MEDICALE_ET_PARMACEUTIQUE":
        setDataToShow([
          { name: "descriptionDeLaRecherche", value: descriptionDeLaRecherche },
          { name: "implicationsForProf", value: implicationsForProf },
          { name: "implicationsForPatient", value: implicationsForPatient },
          { name: "limitationsDeLetude", value: limitationsDeLetude },
          { name: "prochainesEtapes", value: prochainesEtapes },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      case "NOUVELLES_PUBLICATIONS_SCIENTIFIQUES":
        setDataToShow([
          { name: "titreDeLaPublication", value: titreDeLaPublication },
          { name: "auteurs", value: auteurs },
          { name: "journalDePublication", value: journalDePublication },
          {
            name: "descriptionDeLaPublication",
            value: descriptionDeLaPublication,
          },
          { name: "implicationsForProf", value: implicationsForProf },
          { name: "implicationsForPatient", value: implicationsForPatient },
          { name: "limitationsDeLetude", value: limitationsDeLetude },
          { name: "prochainesEtapes", value: prochainesEtapes },
          {
            name: "ressourcesSupplementaires",
            value: ressourcesSupplementaires,
          },
        ]);
        break;
      default:
        setDataToShow([]);
        break;
    }
  }, [slug]);

  return dataToShow;
}
