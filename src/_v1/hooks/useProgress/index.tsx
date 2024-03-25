import React, { useState } from "react";

interface ButtonType {
  className: string;
  type: "submit" | "button" | "reset";
  name: string;
  progress?: boolean;
  payload?: () => Promise<void> | undefined;
}

export const CustomButton = ({
  className,
  progress,
  type,
  name,
  payload,
}: ButtonType) => {
  const handlePayload = () => {
    console.log("HANDLE...");
    if (payload) payload();
  };

  return (
    <button className={className} type={type} onClick={() => handlePayload()}>
      {!progress ? (
        <>{name}</>
      ) : (
        <>
          <div className="flex w-[20px] h-[20px]">
            <div className="relative w-[20px] h-[20px]">
              <div className="w-[20px] h-[20px] rounded-full absolute border-[2px] border-solid border-gray-200/20"></div>
              <div className="w-[20px] h-[20px] rounded-full animate-spin absolute border-[2px] border-solid border-[#ffffff] border-t-transparent"></div>
            </div>
          </div>
        </>
      )}
    </button>
  );
};

const useProgress = () => {
  const [progress, setProgress] = useState(false);

  return { progress, setProgress };
};

export default useProgress;
