import React from 'react';
import UseProducts from '../../../Hooks/UseProducts';
import { HiTrash } from 'react-icons/hi';
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const ManageCars = () => {
    const [items, refetch] = UseProducts();
    const [axiosSecure] = useAxiosSecure();
    // Delete element 
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cars/${id}`)
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })

    }
    return (
        <div className='bg-base-200 min-h-screen mb-32'>
            <Helmet>
                <title>AutoMotive Car | Manage Cars</title>
            </Helmet>
            <SectionTitle subHeader='Hurry Up!' header='MANAGE ALL ITEMS' />

            <div className='bg-white rounded md:w-[80%] w-[80vw] mx-auto mt-4 sm:mt-6 md:mt-10'>
                <p className='ml-2 sm:ml-4 md:ml-10 text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 pt-2 sm:pt-3'>
                    Total Users: {items.length}
                </p>
                <div className="overflow-hidden  overflow-x-auto mx-3 sm:mx-8">
                    <table className="table">
                        <thead className='bg-blue-700 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Car Image</th>
                                <th>Car Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-20">
                                                        <img className='w-24' src={item.image} alt="User Image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.make} {item.model}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <Link className='btn bg-white border-0'>< FaEdit className='w-6 h-6 text-blue-700' /></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(item._id)} className="btn bg-white border-0">< HiTrash className='w-6 h-6 text-red-500' /></button>
                                        </td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCars;