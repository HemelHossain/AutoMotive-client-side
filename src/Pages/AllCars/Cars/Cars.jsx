import React from 'react';
import UseProducts from '../../../Hooks/UseProducts';
import CarItem from '../../Shared/CarItem/CarItem';

const Cars = () => {
    const [items] = UseProducts([]);
    return (
        <div>
            <div className='max-w-screen-lg mx-auto mt-40'>
            <div className=' grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-20'>
                {
                    items.map(item => <CarItem key={item._id} item={item}></CarItem>)
                }
            </div>
        </div>
        </div>
    );
};

export default Cars;