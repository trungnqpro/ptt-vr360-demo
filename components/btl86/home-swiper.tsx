'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function HomeSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="homeSwiper"
      >
        <SwiperSlide>
          <img src="/images/home/nhachinh4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/nhachinh1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/nhachinh0.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/nhachinh2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/home/nhachinh3.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
