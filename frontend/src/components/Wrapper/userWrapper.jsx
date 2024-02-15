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
import LoginPage from "../../pages/user/auth/LoginPage";
import SignUpPage from "../../pages/user/auth/SignUpPage"
import OtpPage from "../../pages/user/auth/OtpPage";
import BaseHomePage from '../../pages/BaseHomePage'
import PrivateRoutes from "../private_routes/PrivateRoutes";

// testing components
import UserListing from "../../pages/admin/list/UserListing";


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
        
        <Route  path="/login" element={<LoginPage/>} />
        <Route  path="/signUp" element={<SignUpPage/>} />
        <Route  path="/otp" element={<OtpPage/>} />
        <Route path="userListing" element={<UserListing/>} />
       
        <Route path="/" element={
            <PrivateRoutes>
                <BaseHomePage/>
            </PrivateRoutes>
        }/>
    </Routes>
   )
}

export default UserWrapper;




