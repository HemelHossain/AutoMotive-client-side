import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddCar = () => {
    const [axiosSecure] = useAxiosSecure();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
   
    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

            // Image upload to imageBB 
        fetch(image_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;
                    const { make, model, year, price, rating, description } = data;
                    const newItem = { make, model, year, price, image: imgUrl, description, rating };
                          
                            //    Add Car 
                    axiosSecure.post('/cars', newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })


                }
            })

    })
    return (
        <div className='md:mt-8 mb-16'>
            <SectionTitle subHeader="What's New" header='Add An Item'></SectionTitle>

            <div className="max-w-2xl md:mx-auto mt-10 p-6 bg-white rounded-md shadow-md mx-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Car Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex md:flex-row flex-col-reverse space-x-2 w-full'>
                        <div className="mb-4 w-full">
                            <label htmlFor="brand-name" className="block text-gray-600 text-sm font-bold mb-2">Brand Name</label>
                            <input
                                type="text"
                                {...register("brandName", { required: true })}
                                className="w-full px-3 py-3 rounded-md focus:outline-none border-gray-200 border-2 bg-white"
                                placeholder="e.g. Toyota"
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="car-model" className="block text-gray-700 text-sm font-bold mb-2">Car Model</label>
                            <input
                                type="text"
                                {...register("carModel", { required: true })}
                                className="w-full px-3 py-3 rounded-md focus:outline-none  border-gray-200 border-2 bg-white"
                                placeholder="e.g. Corolla"
                            />
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col-reverse space-x-2 w-full mb-4'>
                        <div className="mb-4 w-full">
                            <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                            <input
                                type="text"
                                {...register("year", { required: true })}
                                className="w-full px-3 py-3 rounded-md focus:outline-none border-gray-200 border-2 bg-white"
                                placeholder="e.g. 2023"
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="car-price" className="block text-gray-700 text-sm font-bold mb-2">Car Price</label>
                            <input
                                type="text"
                                {...register("carPrice", { required: true })}
                                className="w-full px-3 py-3 rounded-md focus:outline-none border-gray-200 border-2 bg-white"
                                placeholder="e.g. $25,000"
                            />
                        </div>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Car Image</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-primary file-input-bordered border-gray-200 border-2 w-full max-w-xs" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                        <select defaultValue='4'
                            {...register("rating", { required: true })}
                            className="w-full px-3 py-3 rounded-md focus:outline-none  border-gray-200 border-2 bg-white"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            className="w-full px-3 py-3 rounded-md focus:outline-none border-gray-200 border-2 bg-white"
                            rows="4"
                            placeholder="Tell us more about the car..."
                        />
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="btn text-white py-2 px-4 rounded-m bg-blue-700 transition duration-300">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCar;