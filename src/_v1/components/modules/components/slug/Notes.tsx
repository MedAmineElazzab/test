import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
const EmptyAttachment = require("@assets/animations/EmptyAttachements.json");
export default function Notes({ ModuleNote }: { ModuleNote: string | null }) {
  return (
    <>
      <div className="relative h-[400px]">
        {ModuleNote ? (
          <div>
            <p className="w-[100%] leading-7  text-slate-900">{ModuleNote}</p>
          </div>
        ) : (
          <div className="flex absolute w-full h-full   flex-col justify-center items-center">
            <div className="pointer-events-none w-[280px] mb-5 h-[160px]">
              <LottieAnimation loop animationData={EmptyAttachment} />
            </div>
            <div className="flex items-center flex-col gap-4">
              <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-[25px] text-center font-[600] w-full">
                  There is no Notes for this Module
                </h2>
                <p className="text-center text-[#484f59]">
                  Sorry, there are no notes available for this video module.
                  Explore more content <br /> and enhance your learning
                  experience!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
