import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HiTrash } from "react-icons/hi";
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/${user._id}`)
            .then(data => {
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

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
                axiosSecure.delete(`/users/${id}`)
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                        }
                    });
            }
        });
    }

    return (
        <div className='bg-base-200 min-h-screen mb-32'>
            <SectionTitle subHeader='How many?' header='MANAGE ALL USERS' />

            <div className='bg-white rounded md:w-[80%] w-[80vw] mx-auto mt-4 sm:mt-6 md:mt-10'>
                <p className='ml-2 sm:ml-4 md:ml-10 text-xl sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 pt-2 sm:pt-3'>
                    Total Users: {users.length}
                </p>
                <div className="overflow-hidden  overflow-x-auto mx-3 sm:mx-8">
                    <table className="table">
                        <thead className='bg-blue-700 text-white'>
                            <tr>
                                <th>#</th>
                                <th>User Image</th>
                                <th>User Name</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-20">
                                                        <img className='w-24' src={user.photoURL} alt="User Image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>
                                            {user.role === 'admin' ? 'admin' : (
                                                <div className='flex items-center'>
                                                    user
                                                    <button className='ml-1' onClick={() => handleMakeAdmin(user)}>
                                                        <FaUserShield />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <th>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-xs">
                                                <HiTrash className='w-6 h-6 text-red-500' />
                                            </button>
                                        </th>
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

export default AllUsers;
