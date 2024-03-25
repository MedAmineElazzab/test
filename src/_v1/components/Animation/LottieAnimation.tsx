// @ts-ignore

import Lottie from "react-lottie";
export interface lottieProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
}
const LottieAnimation = ({ animationData, loop, autoplay }: lottieProps) => {
  const defaultOptions = {
    loop: loop || true,
    autoplay: autoplay || true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie   options={defaultOptions} />;
};

export default LottieAnimation;
