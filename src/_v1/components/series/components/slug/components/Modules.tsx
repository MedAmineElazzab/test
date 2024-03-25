import { Module } from "@/_v1/api/module";
import { ModuleCard } from "@/_v1/components/modules/components";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default function Modules({
  modules,
  innerWidth,
}: {
  modules: Module[];
  innerWidth: number;
}) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    centerPadding: "0px",
    className: "",
    centerMode: false,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  console.log(innerWidth);
  return (
    <div className="relative flex flex-col gap-4 px-[20px] w1300:px-0">
      <div className="flex flex-col gap-4 mt-4 ">
        <h1 className="text-[22px] font-[500]">Modules</h1>
        <p className="w-[80%] leading-7  text-slate-900">
          Speakers play a pivotal role in shaping our understanding and
          advancing our capabilities
        </p>
      </div>
      {/* {modules.length <= 4 && innerWidth > 1300 ? (
        <div className="w-full">
          <div className="grid grid-cols-5 w1500:grid-cols-3 w1100:grid-cols-2  gap-3">
            {modules.map((el, index) => {
              return <ModuleCard moduleData={el} key={index} />;
            })}
          </div>
        </div>
      ) : ( */}
      <div className="relative w-full px-[0px]">
        <Slider {...settings}>
          {modules.map((el, index) => {
            return (
              <div key={index} className="relative w-full pr-2">
                <ModuleCard moduleData={el} />
              </div>
            );
          })}
        </Slider>
      </div>
      {/* )} */}

      <br />
    </div>
  );
}

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
