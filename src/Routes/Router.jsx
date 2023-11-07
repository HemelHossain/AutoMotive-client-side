import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import AllCars from '../Pages/AllCars/AllCars/AllCars';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import Dashboard from '../Layout/Dashboard';
import MyCart from '../Pages/Dashboard/MyCart/MyCart';
import Purchase from '../Pages/Home/Purchase/Purchase';
import Review from '../Pages/Dashboard/Review/Review';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import ManageCars from '../Pages/Dashboard/ManageCars/ManageCars';
import AddCar from '../Pages/Dashboard/AddCar/AddCar';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Payment from '../Pages/Dashboard/Payment/Payment';
import AllOrders from '../Pages/Dashboard/AllOrders/AllOrders';
import MyOrder from '../Pages/Dashboard/MyOrder/MyOrder';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'allcars',
                element: <AllCars></AllCars>
            },
            {
                path: 'purchase/:id',
                element: <Purchase></Purchase>,
                loader: ({params}) => fetch(`https://auto-motive-server-side.vercel.app/${params.id}`)
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'mycart',
                element: <MyCart></MyCart>
            },
            {
                path: 'review',
                element: <Review></Review>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'myorder',
                element: <MyOrder></MyOrder>
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'managecars',
                element: <AdminRoute><ManageCars></ManageCars></AdminRoute>
            },
            {
                path: 'addcar',
                element: <AdminRoute><AddCar></AddCar></AdminRoute>
            },
            {
                path: 'allorders',
                element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
            },
        ]
    }

])

export default Router;