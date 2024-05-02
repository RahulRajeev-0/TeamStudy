import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ApplicationAdminPrivateRoute from '../private_routes/ApplicationAdminPrivateRoute';

import isApplicationAdmin from '../../utils/isApplicationAdminAuth';
import { Routes, Route } from "react-router-dom";
import { set_authentication } from '../../Redux/Authentication/authenticationSlice';
import AdminLoginPage from '../../pages/admin/auth/AdminLoginPage';
import ApplicationManagementHome from '../../pages/admin/home/ApplicationManagementHome';
import UserListing from "./../../pages/admin/list/UserListing"
import WorkspaceListing from "./../../pages/admin/list/WorkspaceListing"


const ApplicationAdminWrapper = () => {
    const dispatch = useDispatch();
    const authentication_user = useSelector(state=>state.authentication_user);
    

    const checkAuthAndFetchUserData = async () => {
        try {
                                    // returns an object with , name,isathutenticated , isadmin
          const isAuthenticated =  isApplicationAdmin();
          //setting the values to the store slice 
          dispatch(
            set_authentication({
              username: isAuthenticated.username,
              isAuthenticated: isAuthenticated.isAuthenticated,
              isAdmin: isAuthenticated.isAdmin,
            })
          );
          // if the user is authenticated sending request to collect the data
          

          }catch(error){
            console.log(error);
          }
        }
        useEffect(
            ()=>{
                if (!authentication_user){
                    checkAuthAndFetchUserData();
                }
            },[])
            return (
              <>
              <Routes>
                      <Route path="/Login" element={<AdminLoginPage/>} />
                     
                      <Route path="/" element={
                                        <ApplicationAdminPrivateRoute>
                                                <ApplicationManagementHome/>
                                        </ApplicationAdminPrivateRoute> 
                                      } />
                      <Route path="/user-listing" element={
                                        <ApplicationAdminPrivateRoute>
                                                <UserListing/>
                                        </ApplicationAdminPrivateRoute> 
                                      } />
                      <Route path="/workspace-listing" element={
                                    <ApplicationAdminPrivateRoute>
                                      <WorkspaceListing/>
                                    </ApplicationAdminPrivateRoute>
                      } />
              </Routes>
              </>
             
            )
    }
   



export default ApplicationAdminWrapper;
