import { Attachement } from "@/_v1/api/note";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import { DisplayAttachment } from "@/_v1/components/notes/components/slug";
const FilesAttachment = require("@assets/animations/files.json");

export default function Documents({
  ModuleAttachements,
}: {
  ModuleAttachements: Attachement[];
}) {
  return (
    <div className="relative h-[400px]">
      {ModuleAttachements.length>0 ? (
        <div className="flex flex-wrap gap-2">
          {ModuleAttachements.map((el, index) => {
            return (
              <DisplayAttachment
                key={index}
                type={el.type}
                href="#"
                name={el.name}
                size={el.size}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex absolute w-full h-full   flex-col justify-center items-center">
          <div className="pointer-events-none w-[150px] mb-5 h-[150px]">
            <LottieAnimation loop animationData={FilesAttachment} />
          </div>
          <div className="flex items-center flex-col gap-4">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-[25px] text-center font-[600] w-full">
                There is no Attachements for this Module
              </h2>
              <p className="text-center text-[#484f59]">
                Sorry, there are no Attachements available for this video
                module. Explore more content <br /> and enhance your learning
                experience!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
