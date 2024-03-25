import { Progress } from "@mantine/core";

interface ReviewPercentageProps {
  stars: number;
  numberOfComments: number;
  total: number;
}

export default function ReviewPercentage({
  stars,
  numberOfComments,
  total,
}: ReviewPercentageProps) {
  const percentage = (numberOfComments / total) * 100;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 font-[500]">{stars} stars</div>
      <Progress
        className="w-[200px]"
        styles={{
          root: {
            backgroundColor: "#d3d3d3",
            borderRadius: "30px",
            height: "6px",
          },
          bar: {
            backgroundColor: "#0049E0",
          },
        }}
        value={percentage}
      />
      <div className="percentage text-sm font-[500]">
        {total > 0 ? percentage.toFixed(1) + "%" : "0%"}
      </div>
    </div>
  );
}
