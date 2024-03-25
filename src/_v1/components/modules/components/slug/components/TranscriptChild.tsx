import { convertMillisecondsToHHMMSS } from "@/_v1/lib/utils";

export default function TranscriptChild({
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
  return (
    <>
      <div
        dir={lang != "AR" ? "ltr" : "rtl"}
        onClick={handleClick}
        id={"transcript-child-" + id}
        className={"flex gap-5 text-[#344154] w-full z-[10] transition-all p-2".concat(
          " ",
          active
            ? "text-primary-normal font-[500]"
            : "hover:bg-primary-normal/5 hover:text-primary-normal font-[500] rounded-[3px]"
        )}
      >
        <div className="duration w-[170px]  leading-7 ">
          {convertMillisecondsToHHMMSS(time.start) +
            " - " +
            convertMillisecondsToHHMMSS(time.end)}
        </div>
        <div className="data w-[calc(100%-130px)]  leading-7 hover:underline cursor-pointer transition-all hover:text-primary-normal ">
          {content}
        </div>
      </div>
    </>
  );
}
