import React, { useContext, useEffect, useState } from 'react';
import { loginImg } from '../../assets/ImagesJsx/Image';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const {signIn} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const from = location.state?.from?.pathname || '/';
    const onSubmit = (data) => {
            
                //  User Login 
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            reset();
            Swal.fire({
                title: 'User Login Successful.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              });
            navigate(from, {replace: true});
            
        })
        .catch(error => console.error(error));
        
        
    }
                    // Loading Captcha 
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidCaptcha = (e) => {
        const captcha_value = e.target.value;

        if (validateCaptcha(captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }

    }

    return (
        <div>
            <div className="hero min-h-fit bg-base-100 card shadow-2xl w-3/4 mx-auto mt-32">
                <div className="hero-content  flex-col lg:flex-row justify-between">
                    <div className="text-center lg:text-left">
                        <img className='w-[650px] h-[650px] mt-0' src={loginImg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm ">
                        <h1 className="text-4xl font-bold text-center">Login now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("password", { required: true })} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidCaptcha} type="text" placeholder="Type the Captcha Above" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6">
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <input type='submit' disabled={disabled} className="btn btn-primary" value='Login' />
                            </div>
                        </form>   
                        <p className='text-center mt-2'>New Here? <Link to='/signup' className='text-red-600'>Create a New Account</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;