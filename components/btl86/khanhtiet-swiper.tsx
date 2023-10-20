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
import React from 'react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

const handleClick = (swiper, event) => {
  console.log('[handleClick]', { swiper, event });
  if (swiper.activeIndex == 4) {
    // redirect('/suquantam')
  }
};

export default function KhanhTietSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        initialSlide={2}
        navigation={true}
        pagination={{
          clickable: true
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="kt_swiper"
        onClick={handleClick}
      >
        <SwiperSlide>
          <img src="/images/khanhtiet/cuccntt.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/phudieu_phanvangiang.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/phudieu.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/phudieu_ngoxuanlich.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/suquantam.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/btl86.jpeg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
