import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import CoverFeatured from '../Featured/CoverFeatured';
import Testimonial from '../Testimonial/Testimonial';
import CarSection from '../CarSection/CarSection';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>AutoMotive Car | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <CoverFeatured></CoverFeatured>
            <CarSection></CarSection>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;