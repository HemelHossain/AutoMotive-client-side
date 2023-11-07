import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import useCarts from '../../../Hooks/useCarts';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);


const Payment = () => {
    const [carts] = useCarts();
    const total = carts.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div className='bg-white min-h-screen'>
            <Helmet>
                <title>AutoMotive Car | Payment</title>
            </Helmet>
            <Elements stripe={stripePromise} >
                <CheckoutForm carts={carts} price={price} />
            </Elements>
        </div>
    );
};

export default Payment;