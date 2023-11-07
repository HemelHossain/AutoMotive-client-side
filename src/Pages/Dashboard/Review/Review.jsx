import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { FaStar, FaRocket } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';


const Review = () => {
    const {users} = useContext(AuthContext);
    const {axiosSecure} = useAxiosSecure();
    const navigate = useNavigate();

    const handleReview = (event) =>{
        event.preventDefault();
        const form = event.target;
        const rating = form.rating.value;
        const comment = form.comment.value;
        const ratingInfo ={user: {name: users.displayName, image: users.photoURL}, 
        rating, review_date: new Date(),  comment};
               
              //  Rating Post 
        axiosSecure.post('/review', ratingInfo)
        .then(data => {
            if(data.data.insertedId){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Review Added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/');
            }
        })
    }
    return (
        <div >
            <Helmet>
                <title>AutoMotive Car | Add Review</title>
            </Helmet>
            <SectionTitle subHeader='Sharing is careing' header='Give a Review'></SectionTitle>
            <div className='bg-base-200 w-4/5 mx-auto px-20 mt-10 pb-20'>
                <h4 className='text-2xl text-center pt-6'>RATE US</h4>
                <p className='flex justify-center space-x-1 mt-5 /'>
                    <FaStar className='text-gray-300 w-8 h-8' />
                    <FaStar className='text-gray-300 w-8 h-8' />
                    <FaStar className='text-gray-300 w-8 h-8' />
                    <FaStar className='text-gray-300 w-8 h-8' />
                    <FaStar className='text-gray-300 w-8 h-8' />
                </p>
                <form onSubmit={handleReview} className='mt-6 space-y-3' action="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Rating for the Car?</span>
                        </label>
                        <input type="text" name='rating' placeholder="Rating" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Kindly express your care in a short way.</span>
                        </label>
                        <textarea name='comment' className="textarea textarea-bordered h-24" placeholder="Review in detail" />
                    </div>
                    <button className='btn btn-primary mt-3 text-white'><input type="submit" value='Send Review' /> <FaRocket className='w-4 h-5' /></button>
                </form>
            </div>
        </div>
    );
};

export default Review;