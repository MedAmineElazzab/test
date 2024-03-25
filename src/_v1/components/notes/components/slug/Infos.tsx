import { Note } from "@/_v1/api/note";
import { formatTimestamp } from "@/_v1/lib/utils";

export default function Infos(note: Note) {
  console.log(note.implicationsForProf);
  return (
    <div
      style={{ border: "1px solid #F2F4F7  " }}
      className="note-info relative text-[#1E293B] flex flex-col gap-7  mt-4 w-full p-[32px] rounded-[4px] "
    >
      <div className="absolute top-0 m-2 right-0">
        {/* <CopyButton value={""} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                variant="subtle"
                onClick={copy}
              >
                {copied ? (
                  <IconCheck style={{ width: rem(20) }} />
                ) : (
                  <IconCopy style={{ width: rem(20) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton> */}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
          Nom du produit
        </h2>
        <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
          <a href="" className="text-[#0042CC]">
            Valproate
          </a>{" "}
          et dérivés (
          <a href="" className="text-[#0042CC]">
            Dépakine
          </a>
          ,
          <a href="" className="text-[#0042CC]">
            {" "}
            Dépakote
          </a>
          ,
          <a href="" className="text-[#0042CC]">
            {" "}
            Dépamide
          </a>
          <a href="" className="text-[#0042CC]">
            {" "}
            , Micropakine{" "}
          </a>
          et
          <a href="" className="text-[#0042CC]">
            {" "}
            génériques
          </a>
          )
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
          Dénomination Commune Internationale (DCI)
        </h2>
        <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
          <a href="" className="text-[#0042CC]">
            Valproate de sodium
          </a>{" "}
          ou{" "}
          <a href="" className="text-[#0042CC]">
            acide valproïque
          </a>
          ;
          <a href="" className="text-[#0042CC]">
            {" "}
            divalproate de sodium
          </a>
          ;
          <a href="" className="text-[#0042CC]">
            {" "}
            valpromide
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
          Laboratoire pharmaceutique
        </h2>
        <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
          <a href="" className="text-[#0042CC]">
            Sanofi
          </a>{" "}
          <a href="" className="text-[#0042CC]">
            Cooper Pharma
          </a>
        </p>
      </div>
      {note.newMedication && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            New Medication
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.newMedication}
          </p>
        </div>
      )}

      {note.modificationOfMedication && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Modification Of Medication
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.modificationOfMedication}
          </p>
        </div>
      )}

      {note.medicationAvailability && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Medication Availability
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.medicationAvailability}
          </p>
        </div>
      )}
      {note.dateOfPublication && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Date Of Publication
          </h2>
          <p className=" text-justify text-[14px] text-[#667085] font-[400] leading-[24px] ">
            {formatTimestamp(note.dateOfPublication)}
          </p>
        </div>
      )}
      {note.implicationsForProf && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Implications For Prof
          </h2>
          {/* <p className="leading-8 text-justify">{note.implicationsForProf}</p> */}
          <ol className="list-num">
            <li>Informer les patients du risque potentiel.</li>
            <li>
              Discuter des alternatives thérapeutiques avec ceux qui envisagent
              de concevoir un enfant.
            </li>
            <li>
              Orienter vers les plateformes de coordination et dorientation pour
              les inquiétudes sur les troubles du développement.
            </li>
            <li>
              Conseiller de ne pas arrêter le traitement de façon autonome.
            </li>
          </ol>
        </div>
      )}
      {note.implicationsForPatient && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Implications For Patient
          </h2>
          {/* <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.implicationsForPatient}
          </p> */}
          <ol className="list-num">
            <li>Informer les patients du risque potentiel.</li>
            <li>
              Discuter des alternatives thérapeutiques avec ceux qui envisagent
              de concevoir un enfant.
            </li>
            <li>
              Orienter vers les plateformes de coordination et dorientation pour
              les inquiétudes sur les troubles du développement.
            </li>
            <li>
              Conseiller de ne pas arrêter le traitement de façon autonome.
            </li>
          </ol>
        </div>
      )}
      {note.newMedication && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            New Medication
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.newMedication}
          </p>
        </div>
      )}
      {note.withdrawalOfMedication && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Withdrawal Of Medication
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.withdrawalOfMedication}
          </p>
        </div>
      )}
      {note.medicationRecall && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Medication Recall
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.medicationRecall}
          </p>
        </div>
      )}

      {note.regulatoryUpdate && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Regulatory Update
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.regulatoryUpdate}
          </p>
        </div>
      )}

      {note.withdrawalOfMarketAuth && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            withdrawal Of MarketAuth
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.withdrawalOfMarketAuth}
          </p>
        </div>
      )}
      {note.sanctionsAndPenalties && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Sanctions And Penalties
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.sanctionsAndPenalties}
          </p>
        </div>
      )}

      {note.medicationRisks && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Medication Risks
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.medicationRisks}
          </p>
        </div>
      )}

      {note.clinicalPracticeUpdate && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            Clinical Practice Update
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.clinicalPracticeUpdate}
          </p>
        </div>
      )}

      {note.newMedicalResearch && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            New Medical Research
          </h2>
          <p className="text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.newMedicalResearch}
          </p>
        </div>
      )}
      {note.newScientificPublication && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[16px] leading-[20px] text-[#101828] font-[600]">
            New Scientific Publication
          </h2>
          <p className=" text-justify text-[14px] text-[#667085] font-[400] leading-[24px]">
            {note.newScientificPublication}
          </p>
        </div>
      )}

      {/* <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-[600]">
          Implication pour les patients
        </h2>
        <ul className="flex flex-col gap-2 list-decimal pl-4 leading-8 text-justify">
          <li>Informer les patients du risque potentiel.</li>
          <li>
            Discuter des alternatives thérapeutiques avec ceux qui envisagent de
            concevoir un enfant.
          </li>
          <li>
            Échanger avec ceux ayant conçu un enfant pendant le traitement pour
            une prise en charge appropriée.
          </li>
        </ul>
      </div> */}
    </div>
  );
}
