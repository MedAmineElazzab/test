import React, { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const TagCard = ({ children }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Get the width of the element on component mount
    const element = elementRef.current;
    if (element) {
      const elementWidth = element.offsetWidth;
      console.log(elementWidth);
      setWidth(elementWidth);
    }
  }, []); // The empty dependency array ensures this effect runs once on mount

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    console.log("hover enter...");
    setIsHovered(true);
  };

  const handleLeave = () => {
    console.log("hover leave...");
    setIsHovered(false);
  };

  return (
    <div className="" ref={elementRef}>
      <div
        className="slide-content flex gap-[4px] items-center"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        style={{
          transform: isHovered
            ? `translateX(calc(-100% + ${width}px))`
            : `initial`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TagCard;
