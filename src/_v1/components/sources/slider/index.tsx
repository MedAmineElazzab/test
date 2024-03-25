import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  SVGProps,
} from "react";

type Props = {
  children: ReactNode;
  className: string;
};

const Slider = ({ children, className }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollAt, setScrollAt] = useState({ right: true, left: false });
  const [itemsWidth, setItemsWidth] = useState(0);
  const [range, setRange] = useState(0);
  // let [dots, setDots] =

  const onHandleScroll = (e: any) => {
    let scrollStart = e?.target?.scrollLeft;
    let scrollRange = Math.floor(
      e?.target?.scrollWidth - e?.target?.scrollLeft
    );
    let scrollEnd = Math.floor(e?.target?.clientWidth);

    setScrollAt({
      right: scrollRange !== scrollEnd,
      left: scrollStart !== 0,
    });
  };

  const handleScrollLeft = () => {
    console.log(scrollContainerRef.current);
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollLeft -= 300;
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollLeft += 300;
  };

  const handleButtonArrows = () => {
    console.log("Items Width: ", scrollContainerRef?.current?.childNodes[0]);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleButtonArrows);
    return () => window.removeEventListener("resize", handleButtonArrows);
  }, []);

  return (
    <div className="relative flex items-center">
      <div
        ref={scrollContainerRef}
        onScroll={(e) => onHandleScroll(e)}
        className={`scroll-remover !pt-[30px] !pb-[30px] !mt-[0] !mb-[-30px] ${className}`}
        style={{
          // whiteSpace: "nowrap",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </div>

      {/* <div className="flex gap-[20px] items-center justify-between mt-[20px]"> */}
      {/* <div className="flex gap-[3px] items-center">
          {Array(4)
            .fill(undefined)
            .map(() => (
              <>
                <div className="bg-[#0049E0] w-[6px] h-[6px] rounded-[3px]"></div>
              </>
            ))}
        </div>

        <div></div> */}

      {/* <div className="flex gap-[10px]"> */}
      <button
        className={`
          absolute left-[-14px] mb-[-28px] w-[28px] h-[28px] z-[100]
          bg-[#0049E0] text-[#ffffff] rounded-[4px] p-[4px]
          ${!scrollAt?.left && "opacity-[0.5] pointer-events-none"}
        `}
        onClick={handleScrollLeft}
      >
        <LeftIcon width={20} height={20} />
      </button>
      <button
        className={`
          absolute right-[-14px] mb-[-28px] w-[28px] h-[28px] z-[100]
          bg-[#0049E0] text-[#ffffff] rounded-[4px] p-[4px]
          ${!scrollAt?.right && "opacity-[0.5] pointer-events-none"}
        `}
        onClick={handleScrollRight}
      >
        <RightIcon width={20} height={20} />
      </button>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

const RightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.293 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414-1.414L17.586 13H4a1 1 0 1 1 0-2h13.586l-5.293-5.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
);

const LeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.707 4.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Slider;
