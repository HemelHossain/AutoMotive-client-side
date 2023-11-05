import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCarts = () => {
    const {users, loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: carts = [], refetch} = useQuery({
        queryKey:['carts', users?.email],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure(`/carts?email=${users?.email}`);
            return res.data;
        },
    })
    return [carts, refetch];
};

export default useCarts;