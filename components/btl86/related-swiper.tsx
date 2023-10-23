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
import { LeaderMinor } from 'lib/btl86/types';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function RelatedSwiper(props: {list: LeaderMinor[]}) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'coverflow'}
        navigation={true}
        pagination={{
          clickable: true
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="homeSwiper"
      >
        {props.list.map(item => (
          <SwiperSlide key={item.id}>
            <img src={item.url} alt={item.name} />
          </SwiperSlide>
          )) }
      </Swiper>
    </>
  );
}
