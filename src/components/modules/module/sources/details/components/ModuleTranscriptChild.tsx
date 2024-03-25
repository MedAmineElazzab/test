import { convertMillisecondsToMMSS } from "@/lib";
import { clsx } from "@mantine/core";

export function ModuleTranscriptChild({
  time,
  content,
  active,
  id,
  handleClick,
  lang,
}: {
  time: {
    end: number;
    start: number;
  };
  content: string;
  active: boolean;
  id: number;
  lang: string;
  handleClick: () => void;
}) {
  const classNames = clsx({
    "w-[56px] h-[27px] font-semibold text-sm rounded-sm  flex justify-center items-center transition-all":
      true,
    "bg-primary-normal text-white": active === true,
    "bg-gray-200 text-black": active === false,
  });

  return (
    <>
      {/* <div
        dir={lang != "AR" ? "ltr" : "rtl"}
        onClick={handleClick}
        // id={"transcript-child-" + id}
        className={"flex gap-5 text-[#344154] w-full z-[10] transition-all p-2".concat(
          " ",
          active
            ? "text-primary-normal font-[500]"
            : "hover:bg-primary-normal/5 hover:text-primary-normal font-[500] rounded-[3px]"
        )}
      >
        <div className="duration w-[170px]  leading-7 ">{}</div>
        <div className="data w-[calc(100%-130px)]  leading-7 hover:underline cursor-pointer transition-all hover:text-primary-normal ">
          {content}
        </div>
      </div> */}
      <div
        dir={lang != "AR" ? "ltr" : "rtl"}
        id={"transcript-child-" + id}
        onClick={handleClick}
        className="flex items-start gap-8 p-2 z-[10] cursor-pointer"
      >
        <div className={classNames}>
          {convertMillisecondsToMMSS(time.start)}
        </div>
        <div className="text-gray-500 w-[calc(100%-56px)]  leading-6">
          {content}
        </div>
      </div>
    </>
  );
}
