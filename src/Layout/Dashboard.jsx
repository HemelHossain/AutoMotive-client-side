import React from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, Outlet, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaCarSide, FaHome, FaRegCalendarPlus, FaShoppingCart, FaSplotch, FaUsers, FaWallet } from 'react-icons/fa';
import { HiMiniWindow } from 'react-icons/hi2';
import { GiRaceCar } from "react-icons/gi";

const Dashboard = () => {
  const [isAdmin] = useAdmin([]);
  const [bgColor, setBgColor] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes('/dashboard/payment')){
      setBgColor(true);
    }
    else{
      setBgColor(false);
    }
  }, [location.pathname])

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className={`drawer-content justify-start ${bgColor? 'bg-white': 'bg-base-200'}`}>
          <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden  ml-2 mt-2 mr-2"><HiMenuAlt2 /></label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full  bg-blue-700 text-white font-semibold text-sm">
            {/* Sidebar content here */}
            
            <h4 className='text-3xl font-bold ml-3 mt-4'>AUTOMOTIVE CAR</h4>
            <h4 className='text-2xl font-semibold ml-3 mt-1 mb-6'>SHOWROOM</h4>
            
            {
              isAdmin ?
                <>
                  <li><Link to='/dashboard/users'><FaUsers /> All User</Link></li>
                  <li><Link to='/dashboard/managecars'><GiRaceCar /> Manage Cars</Link></li>
                  <li><Link to='/dashboard/addcar'><FaRegCalendarPlus /> Add Car</Link></li>
                  <li><Link to='/dashboard/allorders'><HiMiniWindow /> All Orders</Link></li>
                </>
                :
                <>
                  <li><Link to='/dashboard/mycart'><FaShoppingCart /> My cart</Link></li>
                  <li><Link to='/dashboard/payment'><FaWallet /> Payment</Link></li>
                  <li><Link to='/dashboard/review'><FaSplotch /> Review</Link></li>
                  <li><Link to='/dashboard/myorder'><HiMiniWindow /> My Order</Link></li>
                </>
            }
            <div className="border-t-2 border-white my-2"></div>
            <li><Link to='/'><FaHome /> Home</Link></li>
            <li><Link to='/allcars'><FaCarSide /> All Car</Link></li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;