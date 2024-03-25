import { EventSnippet } from "@/api";
import { FullPath, formatSeconds } from "@/lib";
import { useRouter } from "next/router";

interface EventSnippetCardProps extends EventSnippet {}
export function EventSnippetCard({
  duration,
  endAt = 0,
  startAt = 0,
  title,
  imagePath,
}: EventSnippetCardProps) {
  const { push, query } = useRouter();
  const handleSnippetClick = () => {
    if (
      startAt != null &&
      endAt != null &&
      typeof startAt == "number" &&
      typeof endAt == "number"
    )
      push({
        query: {
          ...query,
          startAt: startAt.toFixed(0),
          endAt: endAt.toFixed(0),
        },
      });
  };
  return (
    <div className="flex flex-col bg-white h-fit hover:shadow-expert-card">
      <div
        className="relative image-section p-2  mb-1 h-44 bg-cover bg-center flex  justify-end items-end rounded-md"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #0049E0 100%), url('${FullPath(
            imagePath
          )}')`,
        }}
      >
        {duration != null && (
          <span className="text-white text-sm">{formatSeconds(duration)}</span>
        )}
      </div>
      <div className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-4">
          <h1
            onClick={handleSnippetClick}
            className="text-gray-900 text-base hover:underline cursor-pointer line-clamp-1 font-semibold leading-5"
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
