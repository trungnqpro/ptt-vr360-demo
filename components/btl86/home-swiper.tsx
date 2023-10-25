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

const transcript = `Nhà truyền thống Bộ Tư lệnh 86, được khởi công xây dựng từ tháng 11 năm 2021, cùng với sở chỉ huy BTL, và khánh thành vào dịp kỷ niệm 79 năm Ngày thành lập QĐND Việt Nam, 34 năm Ngày hội QPTD. Đây là một công trình văn hóa hết sức có ý nghĩa, đáp ứng lòng mong mỏi của lớp lớp thế hệ cán bộ, nhân viên, chiến sĩ của Bộ Tư lệnh 86 trong những năm qua.
Nhà truyền thống nằm tại vị trí tầng 2, phía trên Hội trường Bộ Tư lệnh. Nhà có kết cấu 126,6m2, ngoài phần khánh tiết còn có 4 đề mục được trưng bày gồm:
`;
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
        <SwiperSlide style={{position: 'relative'}}>
          <img src="/images/home/nhachinh4.jpg" />
          <div style={{'position': 'absolute', top: '3%', left: '30%', width: '50%'}}>
            <p>{transcript}</p>
            <br />
            <ul>
              <li>Đề mục 1: Sự quan tâm của lãnh đạo Đảng, Nhà nước, QUTW, BQP đối với BTL 86 (bên phải từ ngoài nhìn vào)</li>
              <li>Đề mục 2: Các đồng chí lãnh đạo, chỉ huy BTL 86 qua các thời kỳ (bên trái từ ngoài nhìn vào)</li>
              <li>Đề mục 3: Cục Công nghệ thông tin/ BTTM giai đoạn 2011 - 2017</li>
              <li>Đề mục 4: Bộ Tư lệnh Tác chiến không gian mạng, từ 2018 – nay
              Và các hiện vật trưng bày qua từng giai đoạn của BTL86.
              </li>
            </ul>
          </div>
          
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
