import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCarts from '../../../Hooks/useCarts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Purchase = () => {
    const { users } = useContext(AuthContext);
    const navigate = useNavigate();
    const { _id, make, model, image, description, price } = useLoaderData();
    const userName = users?.displayName;
    const [ , refetch] = useCarts();
    const [axiosSecure] =useAxiosSecure();

    const handleAddToCart = (event) => {
        event.preventDefault();
        const form = event.target;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const message = form.message.value;
        console.log({address, message});
        


        if (users && users.email) {
            const cartItem = { cart_id: _id, make, model, name: make + ' ' + model , price, image, description,
                email: users.email, user:{name: users.displayName, phoneNumber: phoneNumber, address: address, message: message}};
                    // Add car to cart 
            axiosSecure.post('/carts', cartItem)
                .then(data => {
                    if (data.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Order place successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    }
                })
        }
        


    }

    return (
        <form onSubmit={handleAddToCart} className='flex md:flex-row flex-col-reverse justify-center mt-32 gap-5'>
            <div className='border p-5 mx-10'>
                <div className='flex gap-2'>
                    <div className="form-control max-w-xs">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input name='firstName' type="text" defaultValue={userName?.split(' ')[0]} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control max-w-xs">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input name='lastName' type="text" defaultValue={userName?.split(' ')[1]} className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className="form-control max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" defaultValue={users?.email} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control max-w-xs">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input name='phoneNumber' type="text=" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input name='address' type="text" placeholder='Your Address' className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Message</span>
                    </label>
                    <textarea name='message' className="textarea textarea-bordered h-24" placeholder="Message" />
                </div>
            </div>
            <div className="w-96 md:mx-0 mx-auto">
                <div className='border p-4  '>
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <img
                                src={image}
                                alt={make}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{make} {model}</h2>

                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500">${price}</p>
                        </div>
                    </div>
                    <div className="p-2 border-b">
                        <div className="flex justify-between px-1">
                            <div>
                                <p className="text-sm">Subtotal</p>
                                <p className="text-sm">Shipping</p>
                                <p className="text-sm">Tax</p>
                            </div>
                            <div>
                                <p className="text-sm">$55000.00</p>
                                <p className="text-sm">Free</p>
                                <p className="text-sm">$ 0.00</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm font-bold pr-3 border-t-2 mt-2 px-1">
                            <p>Total</p>
                            <p>$ 55000</p>
                        </div>
                        <button className='w-full btn btn-outline bg-emerald-500 text-white border-0 mt-3 '><input  type="submit" value='Buy Now' /></button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Purchase;