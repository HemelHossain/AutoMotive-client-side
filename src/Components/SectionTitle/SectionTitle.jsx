import React from 'react';

const SectionTitle = ({header, subHeader}) => {
    return (
        <div>
            <h4 className='md:text-xl sm:text-lg text-sm text-center uppercase'>{subHeader}</h4>
        <h3 className='md:text-4xl sm:text-2xl text-lg text-center font-bold pt-1 uppercase'>{header}</h3>
        </div>
    );
};

export default SectionTitle;