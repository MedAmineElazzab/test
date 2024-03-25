import { Attachement } from "@/api";
import { DisplayAttachment } from "@/components";
import { FullPath } from "@/lib";

interface RessourcesProps {
    ressources: Attachement[];
}
export function Ressources(props : RessourcesProps  ) {
  return (
    <div className="Ressources-area bg-gray-50 h-full p-8 gap-4 flex flex-col">
      <h2 className="text-gray-900 font-semibold texts-base">Ressources</h2>
      <div className="grid grid-cols-3 gap-4  ">
        {props.ressources.length > 0 ? (
          props.ressources.map((el, index) => {
            return (
              <DisplayAttachment
                key={index}
                type={el.type}
                href={FullPath(el.path)}
                name={el.name}
                size={el.size}
              />
            );
          })
        ) : (
          <p className="text-gray-500 text-sm leading-relaxed p-8">
            pas de ressources
          </p>
        )}
      </div>
    </div>
  );
}
