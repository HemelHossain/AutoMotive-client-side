import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import CoverFeatured from '../Featured/CoverFeatured';
import Testimonial from '../Testimonial/Testimonial';
import CarSection from '../CarSection/CarSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <CoverFeatured></CoverFeatured>
            <CarSection></CarSection>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;