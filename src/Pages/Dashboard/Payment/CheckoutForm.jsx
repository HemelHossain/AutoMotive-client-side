import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';


const CheckoutForm = ({ carts, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const { users } = useContext(AuthContext)
  const [cardError, setCardError] = useState('');
  const [proccessing, setProccessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionIdId] = useState('');

  useEffect(() => {
            // Create Payment Intent
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price })
        .then(data => setClientSecret(data.data.clientSecret));
    }
  }, [axiosSecure, price]);
                      
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
                //  Payment Method 
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error);
    } else {
      setCardError('')
    }

    setProccessing(true);
                            
                        //  Payment completing 
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: users.displayName || 'unknown',
          email: users.email || 'annoyomously',

        },
      },
    })
    if (confirmError) {
      console.log(confirmError);
    }

    setProccessing(false);
    if (paymentIntent.status === 'succeeded') {
      setTransactionIdId(paymentIntent.id)
      const payment = {
        name: users.displayName,
        email: users.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: carts.length,
        cartsItem: carts.map(item => item._id),
        menuItem: carts.map(item => item.menuItemId),
        status: 'pending',
        itemNames: carts.map(item => item.name)
      }
      axiosSecure.post('/payment', payment)
        .then(data => {
          if(data.data.insertedId && data.data.deletedCount){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Item added successfully',
              showConfirmButton: false,
              timer: 1500
          })

          }
        })
    }

  };
  return (
    <div className='md:mt-20'>
      <p className='text-center text-3xl font-bold'>PAYMENT</p>
      <form onSubmit={handleSubmit}>
        <CardElement className='max-w-md mx-auto border-2 border-blue-600 px-4 py-3 mt-3'
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex justify-center'>
          <button className='pointer rounded text-white bg-blue-700 border-0 mt-4 w-56 inline-block py-2 ' type="submit" disabled={!stripe || !clientSecret || proccessing}>
            Pay
          </button>
        </div>
        {
          cardError && <p className='text-red-600 ml-8'>{cardError}</p>
        }
        {
          transactionId && <p className='text-green-500 ml-8'>Transaction complete with transactionId: {transactionId}</p>
        }
      </form>
    </div>
  );
};

export default CheckoutForm;