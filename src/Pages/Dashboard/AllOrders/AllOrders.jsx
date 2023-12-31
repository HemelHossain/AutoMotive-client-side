import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
const AllOrders = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allorders');
      return res.data;
    }
  })
                // Update Delete Status 
  const handleUpdate = (status, id) => {
    axiosSecure.patch(`/allorders/${id}`, { status })
      .then(data => {
        if (data.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

        }
      })
  }
            // Delete Order 
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
        axiosSecure.delete(`/allorders/${id}`)
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
    <div className='md:pt-3 bg-base-200 min-h-screen'>
      <Helmet>
                <title>AutoMotive Car | All Orders</title>
            </Helmet>
      <SectionTitle header='MANAGE ALL Orders' subHeader='At a Glance!'></SectionTitle>
      <div className='bg-white md:w-[80%] w-[80vw] mx-auto md:mt-6 mt-4 rounded-lg'>
      <p className='text-2xl font-semibold ml-8 pt-4 pb-2'>TOTAL ORDERS: {orders.length}</p>
        <div className="overflow-hidden  h-fit overflow-x-auto  md:mx-auto mb-32 pb-6">
          <table className="mx-3">
            <thead className='bg-blue-700 t-head text-white font-semibold h-8'>
              <tr className='text-sm'>
                <th className="text-left"> # </th>
                <th className="text-left"> Date </th>
                <th className="text-left"> Time </th>
                <th className="text-left"> Customer </th>
                <th className="text-left"> Email </th>
                <th className="text-left"> Car Price </th>
                <th className="text-left"> Car Model </th>
                <th className="text-left"> Activity </th>
                <th className="text-left"> Action </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr className='text-sm border-t border-b' key={index}>
                  <td className="px-4 "> {index + 1} </td>
                  <td className="px-4 "> {new Date(order.date).toLocaleDateString()} </td>
                  <td className="px-4"> {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </td>
                  <td className="px-4"> {order.name} </td>
                  <td className="px-4 w-0"> {order.email} </td>
                  <td className="px-4"> {order.price} </td>
                  <td className="px-4 w-0"> {order.itemNames.join(',  ')} </td>
                  <td className="px-4 py-2">
                    <select onChange={() => handleUpdate(event.target.value, order._id)} className='rounded-md p-2 focus:outline-none  border-gray-200 border-2 bg-white' value={order.status}>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="shipped">Shipped</option>
                    </select>
                  </td>
                  <td className="px-4 py-2"><button onClick={() => handleDelete(order._id)} className="btn btn-ghost btn-xs">< HiTrash className='w-6 h-6 text-red-500' /></button></td>
                </tr>
              ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;