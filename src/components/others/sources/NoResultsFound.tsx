import { Button } from "@/components";
import { LottieAnimations } from "@/components/Animation";
import { nothingFoundLottie } from "@/pages/series";
import { IconArrowLeft } from "@tabler/icons-react";
interface NoResultsFoundProps {
  title: string;
  description: string;
  actionMessage: string;
  action?: () => void;
}
export  function NoResultsFound(props: NoResultsFoundProps) {
  return (
    <div className="relative w-full h-[750px] flex flex-col justify-center items-center">
      <div className="pointer-events-none w-[200px]">
        <LottieAnimations loop animationData={nothingFoundLottie} />
      </div>
      <div className="flex items-center flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-[22px] text-center font-[500] w-full">
            {props.title}
          </h2>
          <p className="text-center text-[#484f59]">{props.description}</p>
        </div>
        <Button
          onClick={() => {
            props?.action?.();
          }}
          variant="filled"
          size="md"
          color="primary"
          leftIcon={
            <IconArrowLeft
              stroke={1.4}
              className="w-[19px] transition-all group-hover:translate-x-1 mr-1"
            />
          }
        >
          {props.actionMessage}
        </Button>
      </div>
    </div>
  );
}
