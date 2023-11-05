import React from 'react';
import './Cover.css'
const Cover = () => {
    return (
        <div className="hero min-h-screen cover-item" >
            <div className="bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Our Car Dealership</h1>
                    <p className="mb-5">Discover the perfect vehicle for your needs. We offer a wide range of high-quality cars, from sleek and stylish sedans to rugged and powerful Cars. Explore our inventory and find your dream car today.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Cover;