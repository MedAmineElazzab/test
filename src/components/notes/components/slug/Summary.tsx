import { Box, Text } from "@/components";
interface SummaryProps {
  summary: string;
}
export function Summary({ summary }: SummaryProps) {
  return (
    <div className="summary relative  text-[#1E293B] flex flex-col gap-4 bg-gray-50  w-full  p-8  rounded">
      <Text  className="font-semibold text-[#101828] text-base">
        Résumé :
      </Text>
      <Box
        className="leading-6 text-base font-normal text-justify text-[#667085]"
        dangerouslySetInnerHTML={{
          __html: summary,
        }}
      />
    </div>
  );
}
