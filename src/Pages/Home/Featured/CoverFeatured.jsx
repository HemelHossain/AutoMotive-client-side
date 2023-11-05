import React from 'react';
import { Parallax } from 'react-parallax';
import { coverImg } from '../../../assets/ImagesJsx/Image';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { LiaCarSolid } from "react-icons/lia";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { FiBell } from "react-icons/fi";
import { IoTrophyOutline } from "react-icons/io5";

const CoverFeatured = () => {
    return (
        <div className='mt-40'>
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={coverImg}
        className='md:h-[550px] sm:h-[700px] object-cover filter blur-none pt-12'
        bgImageAlt="the dog"
        strength={-200}
    >
        <div className='text-white'>
        <SectionTitle header='WELCOME To Automotive Car dealer' subHeader='about AutoMotive'></SectionTitle>
        <div className='flex md:flex-row  sm:flex-col mt-10 items-center mx-auto justify-center md:gap-20 sm: gap-7 text-red-600 '>
            <div className='flex items-center'>
                <div>
                    <LiaCarSolid className='text-6xl mr-2' />
                </div>
                <div>
                    <p>1886</p>
                    <p className='text-white'>New Cars In Stock</p>
                </div>
            </div>
            <div className='flex items-center'>
                <div>
                    <HiOutlineCog6Tooth className='text-6xl mr-2' />
                </div>
                <div>
                    <p className='text-2xl'>1248</p>
                    <p className='text-white'>Used Cars In Stock</p>
                </div>
            </div>
            <div className='flex items-center'>
                <div>
                    <FiBell className='text-6xl mr-2' />
                </div>
                <div>
                    <p className='text-2xl'>1248</p>
                    <p className='text-white'>Happy Clients</p>
                </div>
            </div>
            <div className='flex items-center'>
                <div>
                    <IoTrophyOutline className='text-6xl mr-2' />
                </div>
                <div>
                    <p className='text-2xl'>1248</p>
                    <p className='text-white'>Happy Clients</p>
                </div>
            </div>
         
        </div>
        <div className='flex justify-center mt-8 text-black'>
            <p className='bg-white inline mr-3 p-2 px-5 '>HAVE A QUESTION?</p>
            <p className='bg-white inline p-2 px-5'>CALL US: +9128424355354</p>
        </div>
        <p className='bg-red-600  mx-auto w-32 p-2 text-center rounded-full mt-5'>Learn More</p>
        </div>
        <div style={{ height: '200px' }} />
    </Parallax>
        </div>
    );
};

export default CoverFeatured;