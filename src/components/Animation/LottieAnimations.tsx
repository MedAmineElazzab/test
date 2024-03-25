// @ts-ignore

import Lottie from "react-lottie";
export interface lottieProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  isStopped?: boolean;
  isPaused?: boolean;
}
export const LottieAnimations = ({
  animationData,
  loop,
  autoplay,
  isStopped,
  isPaused,
}: lottieProps) => {
  const defaultOptions = {
    loop: loop || true,
    autoplay: autoplay || true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      isPaused={isPaused}
      isStopped={isStopped}
      options={defaultOptions}
    />
  );
};
