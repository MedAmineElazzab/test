import { slidesData } from "@/data";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthRightSectionSlideContent } from "..";
export function AuthRightSectionSlides() {
  
  return (
    <div className="relative h-full w-full">
      <>
        <Swiper
          effect={"fade"}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          loop={true}
          modules={[EffectFade, Pagination, Autoplay]}
          className="mySwiper h-full w-full p-0"
        >
          {slidesData?.map((el, index) => {
            return (
              <SwiperSlide
                className="w-full h-full rounded-lg overflow-hidden"
                key={index}
              >
                <AuthRightSectionSlideContent {...el} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <style jsx global>{`
          .swiper-slide {
            padding: 0 !important;
          }
          .swiper-pagination-bullet,.swiper-pagination-bullet-active{
            background-color : #fff !important;
          }
        `}</style>
      </>
    </div>
  );
}

