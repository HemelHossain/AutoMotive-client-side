import React, { Children, useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {users, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <progress className='progress w-56'></progress>
    }
    if(users && isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace ></Navigate>
};

export default AdminRoute;