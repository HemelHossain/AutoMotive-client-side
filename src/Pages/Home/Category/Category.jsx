import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { category1, category2, category3, category4, category5, category6 } from '../../../assets/ImagesJsx/Image';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';


const Category = () => {
    return (
    <div className='max-w-screen-lg mx-auto mt-40'>
        <SectionTitle header='Most wanted Item' subHeader='SPECIAL CARS'></SectionTitle>
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            }}
            modules={[Pagination]}
            className="mySwiper mt-14"
        >
            <SwiperSlide>
                <img className='md:w-52 sm:w-48 w-48 mx-auto ' src={category1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='md:w-52 sm:w-48 w-48 mx-auto' src={category2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='md:w-52 sm:w-48 w-48 mx-auto' src={category3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='md:w-52 sm:w-48 w-48 mx-auto' src={category4} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='md:w-52 sm:w-48 w-48 mx-auto' src={category5} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='md:w-52 sm:w-48 w-48 mx-auto' src={category6} alt="" />
            </SwiperSlide>
    </Swiper>
    </div>
);
};

export default Category;