import { RichTextDisplayer, Text } from "@/components";
import { Box } from "@/components/box";

export function SourcesArea({ source }: { source: string }) {
  return (
    <Box className="border border-gray-100 rounded w-full py-10 px-8 gap-8 flex flex-col ">
      <div className="flex flex-col gap-4">
        <Text className="text-black font-semibold text-base">Sources</Text>
        <RichTextDisplayer
          className="leading-6 text-base font-normal  text-[#667085]"
          dangerouslySetInnerHTML={{
            __html: source,
          }}
        />
      </div>
    </Box>
  );
}
