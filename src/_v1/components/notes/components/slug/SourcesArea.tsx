import React from "react";

export default function SourcesArea({ source }: { source: string }) {
  return (
    <div
      style={{ border: "1px solid #F2F4F7 " }}
      className="Sources text-[#1E293B] flex  w-full p-[32px] border rounded-[4px]"
    >
      <div className="flex flex-col gap-5 w-full ">
        <h2 className="font-[600] text-[#101828] text-[16px] leading-[20px]  ">
          Sources
        </h2>
        {/* <p className="leading-8 text-justify">{source}</p> */}
        <ol className="list-num">
          <li>{`L’étude indique une possible augmentation des troubles neurodéveloppementaux chez les enfants dont le père a été traité avec valproate ou ses dérivés dans les trois mois avant la conception, comparés à d'autres antiépileptiques.`}</li>
          <li>
            Échanger avec ceux ayant conçu un enfant pendant le traitement pour
            une prise en charge appropriée.
          </li>
        </ol>
      </div>
    </div>
  );
}
