import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import Button from "@/_v1/components/Buttons/Button";
import { IconArrowLeft } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { nothingFoundLottie } from "./series";

const Page = () => {
  const { back } = useRouter();
  const [isDark, setIsDark] = useState(false);

  const handleTheme = () => {
    let stats = getCookie("theme") === "dark";
    setIsDark(stats);
  };

  useEffect(() => {
    handleTheme();
  }, []);
  return (
    <div className="h-full">
      <div className="relative  w-full h-[600px]  flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center">
          <div className="pointer-events-none w-[200px]">
            <LottieAnimation loop animationData={nothingFoundLottie} />
          </div>
          <div className="flex items-center flex-col gap-4">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2
                className={`
                text-[22px] text-center font-[500] w-full
                 ${isDark ? "text-[white]" : "text-[black]"}
              `}
              >
                Internal Server Error
              </h2>
              <p
                className={`
                  text-center 
                  ${isDark ? "text-[white]/80" : "text-[#484f59]"}
                `}
              >
                {`We're sorry, the page you request has some sort of error`}
              </p>
            </div>
            <Button
              onClick={back}
              className="bg-primary-normal px-[40px] hover:bg-primary-normal/10 hover:text-primary-normal  hover:border-primary-normal py-2 text-white border border-primary-normal/10"
            >
              <IconArrowLeft
                stroke={1.4}
                className="w-[19px] transition-all group-hover:translate-x-1 mr-1"
              />
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
