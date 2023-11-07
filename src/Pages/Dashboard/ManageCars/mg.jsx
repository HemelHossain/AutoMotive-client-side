import React from 'react';

const mg = () => {
    return (
        <div>
            <div className='md:pt-8 bg-base-200 min-h-screen mb-32'>
            <SectionTitle header='MANAGE ALL ITEMS' subHeader='Hurry Up!'></SectionTitle>
            
            <div className='mt-8 lg:mt-10 md:w-[80%] w-[80vw]  bg-white mx-20 rounded pt-4'>
                <p className='ml-10 text-3xl font-semibold mb-3'>Total Items: {items.length}</p>
                <div className="overflow-hidden
                 overflow-x-auto md:mx-8 mx-3 pb-6">
                <table className="table">
                    {/* head */}
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
        </div>
    );
};

export default mg;