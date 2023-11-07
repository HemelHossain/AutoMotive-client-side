import React, { useContext } from 'react';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { signupImg } from '../../assets/ImagesJsx/Image';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Signup = () => {
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();



    const onSubmit = handleSubmit((data) =>{
        createUser(data.email, data.password)
        .then(result => {
            console.log(result);
            const user = result.user;
            const profile ={displayName: data.name, photoURL: data.photoURL};
            updateUserProfile(profile)
                .then(result =>{
                    console.log(data.photoURL);
                    const user = result?.user;
                    const saveUser = {name: data.name, email: data.email, photoURL: data.photoURL}
                               // upload user to server 
                    fetch('http://localhost:5000/users',{
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(saveUser)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.insertedId){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              navigate('/');
                        }
                    })
                    
                })
                .catch(error => console.error(error));
            
        })
        .catch(error => console.error(error));
    })

    return (
        <div>
            <div className="hero min-h-fit bg-base-100 card shadow-2xl w-3/4 mx-auto mt-32 mb-32">
                <div className="hero-content  flex-col lg:flex-row justify-between">
                    <div className="card flex-shrink-0 w-full max-w-sm ">
                        <h1 className="text-4xl font-bold text-center">Sign Up Here</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0">

                            <div className="form-control sm:w-full w-[60vw]">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" placeholder="Enter your name" {...register("name", { required: true })} className="input input-bordered" />
                            </div>
                            <div className="form-control sm:w-full w-[60vw]">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="name" placeholder="Enter photo url" {...register("photoURL", { required: true })} className="input input-bordered" />
                            </div>

                            <div className="form-control sm:w-full w-[60vw]">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" {...register("email", { required: true })} className="input input-bordered" />
                            </div>

                            <div className="form-control sm:w-full w-[60vw]">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("password", { required: true })} className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6 sm:w-full w-[60vw]">
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <input type='submit' className="btn btn-primary" value='Sign Up' />
                            </div>
                        </form>   
                        <p className='text-center mt-2'>Already registered? <Link to='/login' className='text-red-600'>Go to log in</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                    <div className="text-center lg:text-left">
                        <img className='w-[650px] sm:h-[450px] h-[150px] mb-15' src={signupImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;