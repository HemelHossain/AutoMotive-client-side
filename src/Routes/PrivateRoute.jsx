import React, { Children, useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {users, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <progress className='progress w-56'></progress>;
    }

    if(users){
        return children;    
    }
     return <Navigate to='/login' state={{from: location}} replace ></Navigate>; 
};

export default PrivateRoute;