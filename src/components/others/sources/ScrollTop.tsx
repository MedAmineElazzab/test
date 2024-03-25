import { ArrowTop } from "@/components";
import { clsx } from "@mantine/core";
import { useEffect, useState } from "react";
export const scrollToTop = () => {
  const scrollableArea = document.querySelector(".scrollable-area-dashboard");
  if (scrollableArea) {
    scrollableArea.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  }
};
export const ScrollTop: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const classNames = clsx(
    "bg-primary-normal text-white  w-14 h-14 transition-all flex items-center justify-center rounded-full",
    {
      "scale-100 opacity-100 pointer-events-all cursor-pointer ": isScrolled,
      "scale-0 opacity-0 pointer-events-none  ": !isScrolled,
    }
  );
  useEffect(() => {
    const handleScroll = () => {
      const scrollableArea = document.querySelector(
        ".scrollable-area-dashboard"
      );
      if (scrollableArea) {
        if (scrollableArea.scrollTop === 0) {
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
        }
      }
    };

    const scrollableArea = document.querySelector(".scrollable-area-dashboard");
    if (scrollableArea) {
      scrollableArea.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableArea) {
        scrollableArea.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className="scrollable-area-dashboard   fixed bottom-10 right-10 "
    >
      <div className={classNames}>
        <ArrowTop />
      </div>
    </div>
  );
};
