import { Link, Text, ViewState } from "@/components";
import { FullPath, TimeFormatHM } from "@/lib";
import { ViewStates } from "@/services/types";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

interface ModuleSeriesAreaChildProps {
  imagePath: string | null;
  slug: string;
  duration: number;
  title: string;
  status: ViewStates;
}

export function ModuleSeriesAreaChild({
  ...props
}: ModuleSeriesAreaChildProps) {
  console.log(props.status)
  return (
    <div className="flex space-x-4">
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #0049E0 100%), url('${FullPath(
            props.imagePath as string
          )}')`,
        }}
        className="relative video-area rounded-sm w-36 py-1 group px-2 bg-cover flex justify-end items-end bg-center h-24"
      >
        <Link
          className="w-8 h-8 transition-all opacity-0 group-hover:scale-110 group-hover:opacity-100 rounded-full absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white/50 flex justify-center items-center"
          href={"/v2/modules/" + props.slug}
        >
          <IconPlayerPlayFilled className="w-5 text-white" />
        </Link>
        <Text size="xs" color="white">
          {TimeFormatHM(Number(props.duration))}
        </Text>
      </div>
      <div className="relative w-[calc(100%-144px)] flex flex-col justify-between h-24">
        <Link
          href={"/v2/modules/" + props.slug}
          className="line-clamp-3 text-xs font-semibold text-gray-900 "
        >
          {props.title}
        </Link>
        <div className="pb-2">
          {/* {props.status && <ViewState status={props.status} />} */}
          <ViewState status={props.status} />
        </div>
      </div>
    </div>
  );
}
