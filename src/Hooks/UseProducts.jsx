import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UseProducts = () => {
    const {data: items = [], refetch} = useQuery({
        queryKey: ['items'],
        queryFn: async() => {
           const res= await fetch('https://auto-motive-server-side.vercel.app/cars');
           return res.json()
        }
    })
    return [items, refetch];
};

export default UseProducts;