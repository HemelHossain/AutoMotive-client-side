import React from 'react';
import UseProducts from '../../../Hooks/UseProducts';
import { HiTrash } from 'react-icons/hi';
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';


const ManageCars = () => {
    const [items, refetch] = UseProducts();
    const [axiosSecure] = useAxiosSecure();
            // Delete element 
    const handleDelete = (id) =>{
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
                .then(data =>{
                    if(data.data.deletedCount > 0){
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
        <div className='md:pt-8 bg-base-200 min-h-screen mb-32'>
            <SectionTitle header='MANAGE ALL ITEMS' subHeader='Hurry Up!'></SectionTitle>
            
            <div className='mt-8 lg:mt-10 bg-white mx-20 rounded pt-4'>
                <p className='ml-10 text-3xl font-semibold mb-3'>Total Items: {items.length}</p>
                <div className="overflow-x-auto rounded-t-2xl md:mx-8 mx-3 pb-6">
                <table className="table">
                    {/* head */}
                    <thead className='bg-blue-700 text-white h-16'>
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
                            items.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-20">
                                                <img className='w-24' src={item.image} alt="Car Image" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.make} {item.model}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <Link className='btn bg-white border-0'>< FaEdit className='w-6 h-6 text-blue-700' /></Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn bg-white border-0">< HiTrash className='w-6 h-6 text-red-500' /></button>
                                </th>
                            </tr>)
                        }
                        <div></div>

                    </tbody>

                </table>
            </div>
            </div>
        </div>
    );
};

export default ManageCars;