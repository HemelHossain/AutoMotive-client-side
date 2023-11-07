import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const saveUser = {name: user.displayName, email: user.email, photoURL: user.photoURL}
                            //  upload user to server 
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
                          
                    }
                    navigate(from, {replace: true});
                })
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <p className='text-center'>Or Sign in With</p>
            <div className="flex md:flex-row sm:flex-col gap-3 mt-3 justify-center">
                <button onClick={handleGoogleSignIn}><FaGoogle className='w-12 h-12 rounded-full border border-blue-700 text-blue-900 p-2' /></button>
                <button><FaFacebookF className='w-12 h-12 rounded-full border border-blue-700 p-2 text-blue-900' /></button>
                <button><FaGithub className='w-12 h-12 rounded-full border border-blue-700 text-blue-900 p-2' /></button>
            </div>
        </div>
    );
};

export default SocialLogin;