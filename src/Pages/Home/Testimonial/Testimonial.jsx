import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
    const [ratings, setRatings] = useState([]);
    const [isExpand, setIsExpand] = useState(false);
    useEffect(() => {
        fetch('https://auto-motive-server-side.vercel.app/review')
            .then(res => res.json())
            .then(data => setRatings(data))
    }, [])

    const toggleReadMore = () => {
        setIsExpand(!isExpand);
    }

    return (
        <div className='mt-40 mb-40'>
            <SectionTitle subHeader="What's our client say" header="Testimonial"></SectionTitle>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    ratings.map(rating => <SwiperSlide className=' mt-20' key={rating._id}><div className="card w-80 bg-base-100 shadow-xl mx-auto mb-2">
                        <div className="card-body p-5 ">
                            <div className='flex items-center'>
                                <div className="avatar">
                                    <div className="w-14 rounded-full mr-2">
                                        <img src={rating.user.image} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-b">{rating.user.name}</h2>
                                    <p className='text-xs'>{rating.review_date}</p>
                                </div>
                            </div>
                            <Rating className='text-yellow-200' style={{ maxWidth: 180 }} value={rating.rating} readOnly />
                            <div>
                                {rating.comment.length > 100? (
                                    <div>
                                        {isExpand ? (
                                            rating.comment 
                                        ) : (
                                            <p>
                                                {rating.comment.slice(0, 100)}
                                            </p>
                                        )}
                                        <button className='text-red-600 ml-1' onClick={toggleReadMore}>
                                                    {isExpand ? 'Read Less' : 'Read more'}
                                                </button>
                                    </div>
                                ) : (
                                    rating.comment 
                                )}
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Testimonial;