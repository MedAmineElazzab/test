import { clsx } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LottieAnimations } from "../Animation";

import meducateLottie from "@public/assets/animations/meducate.json";

export const LoaderMeducate = () => {
  const { events } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [opacityLevel, setOpacityLevel] = useState<number>(1);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);
    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);

    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
      events.off("routeChangeError", handleComplete);
    };
  }, []);

  useEffect(() => {
    if (typeof window != undefined) {
      window.onload = () => {
        setOpacityLevel(0.6);
        setIsLoading(false);
      };
    }
    else {
      console.log("dhjdgzj")
    }
  }, []);

  const classNames = clsx(
    "fixed w-full h-full z-[99999] transition-all  flex justify-center items-center",
    {
      "opacity-0 pointer-events-none": !isLoading,
      "opacity-100 pointer-events-all": isLoading,
      "bg-white/60": opacityLevel === 0.6,
      "bg-white": opacityLevel === 1,
    }
  );

  return (
    <div className={classNames}>
      <div className="w-[120px] pointer-events-none">
        <LottieAnimations
          isStopped={false}
          loop
          animationData={meducateLottie}
        />
      </div>
    </div>
  );
};
