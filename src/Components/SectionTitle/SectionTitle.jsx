import React from 'react';

const SectionTitle = ({header, subHeader}) => {
    return (
        <div>
            <h4 className='text-xl text-center uppercase'>{subHeader}</h4>
        <h3 className='text-4xl text-center font-bold pt-1 uppercase'>{header}</h3>
        </div>
    );
};

export default SectionTitle;