import { SerieExpert } from "@/_v1/api/serie";
import { ExpertCard } from "@/_v1/components/experts/components";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "@/_v1/components/slider/components/utils";
import { FullPath } from "@/_v1/lib/utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default function Experts({
  experts,
  innerWidth,
}: {
  experts: SerieExpert[];
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
  return (
    <div className="flex flex-col gap-4 px-[20px] w1300:px-0  ">
      <div className="flex flex-col gap-4 mt-4 ">
        <h1 className="text-[22px] font-[500]">Experts</h1>
        <p className="w-[80%] leading-7  text-slate-900">
          Experts play a pivotal role in shaping our understanding and advancing
          our capabilities
        </p>
      </div>
      {/* {experts.length <= 4 && innerWidth > experts.length * 300 ? (
        <div className="relative  w-full gap-4 grid grid-cols-5 w1500:grid-cols-3 w1100:grid-cols-2">
          {experts.map((el, index) => {
            return (
              <ExpertCard
                key={index}
                firstName={el.expert.firstName}
                lastName={el.expert.lastName}
                image={FullPath(el.expert.imagePath)}
                speciality={el.expert.note}
                id={el.expertId}
                slug={el.expert.slug}
              />
            );
          })}
        </div>
      ) : ( */}
      <div className="relative w-full">
        <Slider {...settings}>
          {experts.map((el, index) => {
            return (
              <div key={index} className="relative w-full pr-2">
                <ExpertCard
                  firstName={el.expert.firstName}
                  lastName={el.expert.lastName}
                  image={FullPath(el.expert.imagePath)}
                  speciality={el.expert.note}
                  id={el.expertId}
                  slug={el.expert.slug}
                />
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
