import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import { bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5, bannerImg6 } from '../../../assets/ImagesJsx/Image';

const Banner = () => {
    return (
        <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src={bannerImg1} /></SwiperSlide>
        <SwiperSlide><img src={bannerImg2} /></SwiperSlide>
        <SwiperSlide><img src={bannerImg3} /></SwiperSlide>
        <SwiperSlide><img src={bannerImg4} /></SwiperSlide>
        <SwiperSlide><img src={bannerImg5} /></SwiperSlide>
        <SwiperSlide><img src={bannerImg6} /></SwiperSlide>
      </Swiper>
    );
};

export default Banner;