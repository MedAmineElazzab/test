import React, { useState } from "react";

const Badge = React.forwardRef(
  (
    {
      className,
      children,
      onClick,
      color,
      style,
    }: {
      className?: string;
      children: React.ReactNode;
      onClick?: () => void;
      color?: string,
      style?: React.CSSProperties;
    },
    ref?: React.Ref<HTMLDivElement>
  ) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
      <div
        onClick={onClick}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`speciality truncate  cursor-pointer  group text-[14px] leading-[20px] trun  gap-2 flex items-center py-1   px-2 rounded-[16px]  font-[400] !border-opacity-5`.concat(
          " ",
          String(className || "")
        )}
        style={{...style, backgroundColor: isHovered ? `${color}45` : `${color}15`  }}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
export default Badge;
