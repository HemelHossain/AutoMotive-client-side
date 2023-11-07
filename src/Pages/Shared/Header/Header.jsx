import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { logo } from '../../../assets/ImagesJsx/Image';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { HiMenuAlt2 } from "react-icons/hi";
import useAdmin from '../../../Hooks/useAdmin';


const Header = () => {
    const { users, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

                    // Log Out option 
    const handleLogOut = () => {
        logOut()
            .then(result => {
                const user = result?.user;
            })
            .catch(error => console.error(error));
    }              

                //  Nav Bar Options 
    const navOption = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/allcars'>All Cars</Link></li>
        <li><Link to={isAdmin? '/dashboard/users': '/dashboard/mycart'}>Dashboard</Link></li> 
            
        


    </>
    return (
        <div>
            <div className="max-w-screen-lg navbar fixed bg-opacity-20 top-0 left-0 right-0 z-10 bg-base-100 h-8 mx-auto pt-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <HiMenuAlt2 className='w-6 h-6'></HiMenuAlt2>
                        </label>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOption}
                        </ul>
                    </div>

                    <img className='md:w-40 w-32' src={logo} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOption}
                    </ul>
                </div>
                <div className="navbar-end ">
                    {
                        users ? <><Link className="btn btn-outline border-0 hover:mr-2" onClick={handleLogOut} to='/allcars'>Log Out</Link>
                            <div className="avatar">
                                <div className="w-8  rounded-full">
                                    <img src={users.photoURL
                                    } />
                                </div>
                            </div>
                        </> : <Link className="btn btn-outline border-0" to='/login' >Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;