import React from 'react';
import UseProducts from '../../../Hooks/UseProducts';
import CarItem from '../../Shared/CarItem/CarItem';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import {Link} from 'react-router-dom'
const CarSection = () => {
    const [items] = UseProducts([]);
    return (
        <div className='max-w-screen-lg mx-auto mt-40'>
            <SectionTitle header='RECOMMENDED CARS' subHeader='Exclusive Selection'></SectionTitle>
            <div className=' grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-20'>
                {
                    items.slice(0, 6).map(item => <CarItem key={item._id} item={item}></CarItem>)
                }
            </div>
            <button className="btn btn-outline mt-3 border-0 border-b-4"><Link to='/allcars'>All Cars</Link></button>
        </div>

    );
};

export default CarSection;