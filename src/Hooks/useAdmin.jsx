import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {users, loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: isAdmin = [], isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', users?.email],
        enabled: !loading,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/admin/${users?.email}`);
            console.log(res.data.admin);
            console.log(res.data.admin);
            return res.data.admin;
        }
    })
    return [isAdmin, isAdminLoading];
};

export default useAdmin;