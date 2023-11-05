import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const { users } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

                // fetching my order 
    useEffect(() => {
        axiosSecure.get(`/myorder?email=${users?.email}`)
            .then(data => {
                setOrders(data.data)
            });
    }, [axiosSecure, users?.email]);
    return (
        <div className='md:pt-8 bg-base-200 min-h-screen mb-32'>
            <SectionTitle subHeader='How many?' header='MANAGE ALL USERS'></SectionTitle>
            <div className='bg-white rounded mx-10 mt-10 md:mx-20'>
                <p className='ml-10 text-3xl font-semibold mb-3 pt-4'>Total Users: {orders.length}</p>
                <div className="rounded-t-2xl overflow-x-auto md:mx-8 mx-3 pb-6">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-blue-700 h-16 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Car Name</th>
                                <th>Quantity</th>
                                <th>Payment</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => <tr key={order._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td className="px-4 "> {new Date(order.date).toLocaleDateString()} </td>
                                    <td className="px-4"> {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </td>
                                    <td>
                                        {order.itemNames.join(' ,')}
                                    </td>
                                    <td>
                                        {order.quantity}
                                    </td>
                                    <td>
                                        Paid
                                    </td>
                                    <td>
                                        ${order.price}
                                    </td>
                                    <td>
                                        {order.status}
                                    </td>
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

export default MyOrder