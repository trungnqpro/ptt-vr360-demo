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
import { EffectFade, Navigation, Pagination, Zoom } from 'swiper/modules';


const handleZoomChange = (swiper: any, scale: any) => {
  console.log("[handleZoomChange]", {swiper, scale})
}

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
        modules={[EffectFade, Navigation, Pagination, Zoom]}
        className="kt_swiper"
        onZoomChange={handleZoomChange}
        grabCursor={true}
        zoom={{
          minRatio: 1,
          maxRatio: 2.5
        }}
      >
        <SwiperSlide>
          <img src="/images/khanhtiet/cuccntt.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/phudieu_phanvangiang.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-zoom-container">
            <img src="/images/khanhtiet/phudieu.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/phudieu_ngoxuanlich.jpeg" />
        </SwiperSlide>
        <SwiperSlide onClick={() => location.href='/suquantam'}>
          <img src="/images/khanhtiet/suquantam.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/khanhtiet/btl86.jpeg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
