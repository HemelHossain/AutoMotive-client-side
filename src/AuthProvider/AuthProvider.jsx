import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/irebase.init';
import axios from 'axios';

const auth = getAuth(app) ;

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

                // User sign in by google 
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
             // User sign in by emal, password 
    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
            // Create User by emal, password
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
            //    Update User picture & name 
    const updateUserProfile = (profile) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }
            //  Log Out 
    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }
            //  Watching User 
    useEffect(() =>{
        const unSubscribe =onAuthStateChanged(auth, currentUser =>{
            setUsers(currentUser);
            if(currentUser){
                axios.post('http://localhost:5000/jwt', {
                    email: currentUser.email
                })
                .then(data =>{
                    localStorage.setItem('access-token', data.data);
                    setLoading(false);
                })

            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
            
        })

        return () => {
            return unSubscribe();
        }

    }, [])



    const authInfo = {
        googleSignIn,
        signIn,
        createUser,
        users,
        updateUserProfile,
        loading,
        setLoading,
        logOut
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;