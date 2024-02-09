import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";

// utility Functions
import isAuthUser from "../../utils/isAuth";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { set_authentication } from "../../Redux/authentication/authenticationSlice";


// axios
import axios from "axios";


// components 
import Login from "./auth/Login/Login";
import Register from './auth/Register/Register'
import EmailVerifyOTP from './auth/otp/EmailVerifyOTP'
import BaseHomePage from './../../pages/BaseHomePage'
import PrivateRoutes from "../PrivateRoutes";




function UserWrapper() {
    const dispatch = useDispatch();
    const authentication_user = useSelector(state=>state.authentication_user)

    //  checking if the user is authenticated and authorized 

    const checkAuth = async ()=>{
        const isAuthenticated = await isAuthUser();
        dispatch(
            set_authentication({
                name:isAuthenticated.name,
                isAuthenticated:isAuthenticated.isAuthenticated,
            })
        );
    };

    const baseURL = "http://127.0.0.1:8000"
    const token = localStorage.getItem('access');
    
   useEffect(()=>{
    if (!authentication_user){
        checkAuth();
    }
   },
   [authentication_user])

   return (
    <Routes>
        <Route  path="/login" element={<Login/>} />
        <Route  path="/signUp" element={<Register/>} />
        <Route  path="/otp" element={<EmailVerifyOTP/>} />
        <Route path="/" element={
            <PrivateRoutes>
                <BaseHomePage/>
            </PrivateRoutes>
        }/>
    </Routes>
   )
}

export default UserWrapper;




