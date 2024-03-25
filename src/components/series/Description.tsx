import { Attachement } from "@/api";
import { DisplayAttachment } from "@/components";
import { FullPath } from "@/lib";

interface SerieDescriptionProps {
  description: string;
  objective: string;
 
}
export function SerieDescription(props: SerieDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="description-area bg-gray-50 p-8 gap-4 flex flex-col">
        <h2 className="text-gray-900 font-semibold texts-base">
          Description de la série
        </h2>
        <p className="text-gray-500 text-sm leading-6">{props.description}</p>
      </div>
      <div className="objectif-area border border-gray-100 p-8 gap-4 flex flex-col">
        <h2 className="text-gray-900 font-semibold texts-base">Objectifs</h2>
        <p className="text-gray-500 text-sm leading-6">{props.objective}</p>
      </div>
      
    </div>
  );
}
