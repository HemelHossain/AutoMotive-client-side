import React from 'react';
import useCarts from '../../../Hooks/useCarts';
import { HiTrash } from "react-icons/hi";
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyCart = () => {
    const [carts, refetch] = useCarts();
    const [axiosSecure] = useAxiosSecure();
    const price = carts.reduce((sum, item) => sum + item.price , 0);

            //    Delete element 
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
                axiosSecure.delete(`/carts/${id}`)
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
            <div className='bg-base-200 min-h-screen md:pt-8'>
                <SectionTitle subHeader='My Cars' header='Wanna Add More Car'></SectionTitle>
                <div className='bg-white mt-10 md:mx-20 mx-10'>
                    <div className='flex justify-between mx-4 md:mx-10 pt-5 mb-6 md:mb-7'>
                    <p className='md:text-3xl text-2xl font-semibold'>Total Cars: {carts.length}</p>
                    <p className='md:text-3xl text-2xl font-semibold'>Total Price: {price}</p>
                    <Link to='/dashboard/payment' className='rounded-md pointer py-1 bg-blue-700 hover:bg-blue-700 text-white md:px-8 px-6'>Pay</Link>
                    </div>
                    <div className="rounded-t-2xl overflow-x-auto mx-4 md:mx-10 pb-6">
                <table className="table">
                    {/* head */}
                    <thead className='bg-blue-700 text-white h-16'>
                        <tr>
                            <th>#</th>
                            <th>Car Image</th>
                            <th>Car Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((cart, index) => <tr key={cart._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-20">
                                                <img className='w-24' src={cart.image} alt="Car Image" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                    {cart.make} {cart.model}
                                </td>
                                <td>{cart.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(cart._id)} className="btn btn-ghost btn-xs">< HiTrash className='w-6 h-6 text-red-500' /></button>
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

export default MyCart;