import { DisplayAttachment, Text } from "@/components";
import { Attachement } from "@/services/types";
interface ModuleRessourcesProps {
  ressources: Attachement[];
}
export function ModuleRessources({ ...props }: ModuleRessourcesProps) {
  return (
    <div className="flex flex-col gap-4 p-8 bg-[#F3F4F8] h-full ">
      <Text className="font-semibold text-base text-black">
        Ressources du module
      </Text>
      <div className="flex gap-4 ">
        {props.ressources.length > 0 ? (
          props.ressources.map((el, index) => {
            return (
              <DisplayAttachment
                key={index}
                type={el.type}
                href="#"
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
