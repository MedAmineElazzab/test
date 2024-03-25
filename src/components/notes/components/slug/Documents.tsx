import { Attachement } from "@/_v1/api/note";
import { FullPath } from "@/_v1/lib/utils";
import { DisplayAttachment } from "./index";
interface DocumentsAreaProps {
  Attachement: Attachement[];
}
export  function DocumentsArea({ Attachement }: DocumentsAreaProps) {
  return (
    <div className="Documents text-black flex bg-gray-50  p-8 w-full rounded">
      <div className="flex flex-col gap-5 w-full ">
        <h2 className="font-[600] text-black text-[16px] leading-[20px]">Ressources :</h2>
        <div className="attachements flex items-center gap-5">
          {Attachement?.map((el, index) => {
            return (
              <DisplayAttachment
                key={index}
                name={el?.name + "." + el?.path?.split(".")?.pop()}
                size={el?.size}
                href={FullPath(el?.path)}
                type={el?.type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
