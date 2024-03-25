import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { CustomArrowProps } from "react-slick";

export const CustomPrevArrow: React.FC<CustomArrowProps> = ({
    onClick,
    className,
  }) => {
    return (
      <div
        onClick={onClick}
        className={"absolute right-[50px] top-[-60px] w-[45px] h-[45px] shadow cursor-pointer transition-all active:scale-95  flex justify-center items-center rounded-full bg-primary-normal/10 text-primary-normal".concat(
          " ",
          String(className).includes("disabled")
            ? "opacity-40 pointer-events-none"
            : ""
        )}
      >
        <IconArrowLeft className="w-[20px] h-[20px]" />
      </div>
    );
  };
  
  export const CustomNextArrow: React.FC<CustomArrowProps> = ({
    onClick,
    className,
  }) => {
    return (
      <div
        onClick={onClick}
        className={"absolute right-[0px] top-[-60px]  w-[45px] h-[45px] shadow cursor-pointer transition-all active:scale-95   flex justify-center items-center rounded-full bg-primary-normal/10 text-primary-normal".concat(
          " ",
          String(className).includes("disabled")
            ? "opacity-40 pointer-events-none"
            : ""
        )}
      >
        <IconArrowRight className="w-[20px] h-[20px]" />
      </div>
    );
  };
  