import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";

// utility Functions
import isAuthUser from "../../utils/isAuth";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { set_authentication } from "../../Redux/authentication/authenticationSlice";
import { set_selected_workspace } from "../../Redux/WorkspaceBaseDetails/workspaceBaseDetailsSlice";

// axios
import axios from "axios";


// components 
import LoginPage from "../../pages/user/auth/LoginPage";
import SignUpPage from "../../pages/user/auth/SignUpPage"
import OtpPage from "../../pages/user/auth/OtpPage";
import BaseHomePage from '../../pages/BaseHomePage'
import PrivateRoutes from "../private_routes/PrivateRoutes";
import WorkspaceInvitationPage from "../../pages/user/Workspace/WorkspaceInvitationPage";


// google Oauth 
import { GoogleOAuthProvider } from '@react-oauth/google';
import WorkspaceHome from "../../pages/user/Workspace/WorkspaceHome";
import WorkspaceAdminSettingsPage from "../../pages/user/workspaceAdmin/workspaceAdminSettingsPage";
import WorkspaceAdminMemberManagementPage from "../../pages/user/workspaceAdmin/workspaceAdminMemberManagement/workspaceAdminMemberManagementPage";



function UserWrapper() {

    const baseURL = "http://127.0.0.1:8000"
    const token = localStorage.getItem('access');
    const dispatch = useDispatch();
    const authentication_user = useSelector(state=>state.authentication_user)
    const workspaceId = sessionStorage.getItem('workspaceId')
    
    // fetching the details of the workspace and store it in redux
    const fetchWorkspaces = async () => {
        
        try{
            const response = await axios.get(baseURL+`/workspace/user-workspace-details/${workspaceId}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
        
            if (response.status === 200){
              const workspaceDetails = {
                workspaceId:response.data.id,
                workspaceName:response.data.workspace_name,
                workspaceDescription:response.data.description,
                isPremium:response.data.is_premium,
                created_by:response.data.created_by,
                create_on:response.data.create_on
                
              }

              dispatch(set_selected_workspace(workspaceDetails))
             
              
            }else{
              return {}
            }
            
        }catch(error) {
            console.error("Error Fetching data:". error);
        }
    };
    
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

    
    
   useEffect(()=>{
    if (!authentication_user){
        checkAuth();
    }
    if (workspaceId){
        
        fetchWorkspaces();
    }

    
   },
   [authentication_user])

   return (
    <GoogleOAuthProvider clientId="542004528081-920qoaeaj25vg2eclgqlrr01qgoejs3o.apps.googleusercontent.com">
    <Routes>
        <Route  path="/login" element={<LoginPage/>} />
        <Route  path="/signUp" element={<SignUpPage/>} />
        <Route  path="/otp" element={<OtpPage/>} />
        <Route path="/workspace-invitation/:userId/:workspaceId" element={<WorkspaceInvitationPage/>} />
        
       {/* private routes here  */}
        <Route path="/" element={<PrivateRoutes>  <BaseHomePage/>  </PrivateRoutes>}/>
        <Route path="/workspace" element={<PrivateRoutes>  <WorkspaceHome/>  </PrivateRoutes>} />
        <Route path="/workspace-settings" element={<PrivateRoutes>  <WorkspaceAdminSettingsPage/>  </PrivateRoutes>} />
        <Route path="/workspace-settings-members" element={<PrivateRoutes>  <WorkspaceAdminMemberManagementPage/>  </PrivateRoutes>} />


    </Routes>
        </GoogleOAuthProvider>
   )
}

export default UserWrapper;




