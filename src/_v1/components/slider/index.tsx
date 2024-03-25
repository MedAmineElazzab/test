import { SwiperCards } from "@/_v1/data/NotesCards";
import { DoctorVector, EmergencyVector } from "@/_v1/icons";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react"; // Use Swiper instead of Slider
import SwiperCard from "./components/SwiperCard";

export default function Slider() {
  return (
    <div className="slider-container relative w-full">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          enabled: true,
        }}
        spaceBetween={0}
        autoplay={true}
        loop={true}
        className="w-full pb-[60px] w1300:pb-[30px]"
      >
        {SwiperCards.map((el, index) => {
          return (
            <SwiperSlide key={index} className="swiper-slide--one">
              <SwiperCard
                key={index}
                icon={
                  index % 2 === 0 ? (
                    <DoctorVector className="w-[50px] h-[50px]" />
                  ) : (
                    <EmergencyVector className="w-[50px] h-[50px]" />
                  )
                }
                {...el}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
