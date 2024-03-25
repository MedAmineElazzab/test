import React, { ReactNode } from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

type Props = {
  children: ReactNode;
  classNameCarousel: string;
  classNameContainer: string;
};

const Carousel = ({
  children,
  classNameCarousel,
  classNameContainer,
}: Props) => {
  return (
    <div className={classNameCarousel}>
      <ScrollingCarousel className="relative flex w-[calc(100%)] mb-[-30px]">
        <div className={classNameContainer}>{children}</div>
        <div className="hidden"></div>
      </ScrollingCarousel>
    </div>
  );
};

export default Carousel;
