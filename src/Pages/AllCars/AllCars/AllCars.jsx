import React from 'react';
import Cover from '../Cover/Cover';
import Cars from '../Cars/Cars';
import { Helmet } from 'react-helmet-async';

const AllCars = () => {
    return (
        <div>
            <Helmet>
                <title>AutoMotive Car | All Cars</title>
            </Helmet>
            <Cover></Cover>
            <Cars></Cars>
        </div>
    );
};

export default AllCars;