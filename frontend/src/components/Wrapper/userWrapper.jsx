import React, {useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// utility Functions
import isAuthUser from "../../utils/isAuth";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { set_authentication } from "../../Redux/authentication/authenticationSlice";
import { set_selected_workspace } from "../../Redux/WorkspaceBaseDetails/workspaceBaseDetailsSlice";

import { set_display_name } from "../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice";
import { set_phone_no } from "../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice";
import { set_is_admin } from "../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice";
import { set_about_me } from "../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice";
import { set_profile_pic } from "../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice";
import { set_id } from "../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice";
// axios
import axios from "axios";


// components 
import LoginPage from "../../pages/user/auth/LoginPage";
import SignUpPage from "../../pages/user/auth/SignUpPage"
import OtpPage from "../../pages/user/auth/OtpPage";
import BaseHomePage from '../../pages/BaseHomePage'
import PrivateRoutes from "../private_routes/PrivateRoutes";
import WorkspaceInvitationPage from "../../pages/user/Workspace/WorkspaceInvitationPage";
import DMPage from "../../pages/user/WorkspaceChating/DMPage"
import OneOnOneVideoCall from '../../components/user/OneOnOneVideo/ZegoVideoCall'
import OneOnOneAudioCall from "../user/OneOnOneAudio/ZegoAudioCall";
import GroupVideoCall from "../user/GroupCalls/GroupVideoCall";
import GroupAudioCall from "../user/GroupCalls/GroupAudioCall";
import AfterPaymentPage from "../../pages/user/Workspace/AfterPaymentPage";
import ChatBotPage from "../../pages/user/ChatBot/ChatBotPage";

// google Oauth 
import { GoogleOAuthProvider } from '@react-oauth/google';
import WorkspaceHome from "../../pages/user/Workspace/WorkspaceHome";
import WorkspaceAdminSettingsPage from "../../pages/user/workspaceAdmin/workspaceAdminSettingsPage";
import WorkspaceAdminMemberManagementPage from "../../pages/user/workspaceAdmin/workspaceAdminMemberManagement/workspaceAdminMemberManagementPage";
import ChannelPage from "../../pages/user/WorkspaceChating/ChannelPage";



function UserWrapper() {
    const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL
    
    const token = localStorage.getItem('access');
    const dispatch = useDispatch();
    const authentication_user = useSelector(state=>state.authentication_user)
    const workspaceId = sessionStorage.getItem('workspaceId')
    
    // fetching the details of the workspace and store it in redux
    const fetchWorkspaces = async () => {
        
        try{
          console.log('============');
          console.log(workspaceId);
          if (workspaceId == null){
            window.location.reload();
        }
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
                create_on:response.data.create_on,
               
                
              }

              dispatch(set_selected_workspace(workspaceDetails))
             
              
            }else{
              return {}
            }
            
        }catch(error) {
            console.error("Error Fetching data:". error);
        }
    };

    // getting the user profile inside the workspace
    const fatchUserProfile = async () => {
      const workspaceId = sessionStorage.getItem('workspaceId')
      if (workspaceId == null){
        window.location.reload();
    }
      try{
        const response = await axios.get(baseURL+`/workspace/user-profile-details/${workspaceId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (response.status === 200){
          dispatch(set_is_admin(response.data.is_admin))
          dispatch(set_display_name(response.data.display_name))
          dispatch(set_about_me(response.data.about_me))
          dispatch(set_phone_no(response.data.phone_no))
          dispatch(set_profile_pic(response.data.profile_pic))
          dispatch(set_id(response.data.id))
          
          console.log(response.data);
        }

      }catch(error){
        navigate('/')
      }
    }
    
    
    //  checking if the user is authenticated and authorized 
    const checkAuth = async ()=>{
        const isAuthenticated = await isAuthUser();
        dispatch(
            set_authentication({
                id:isAuthenticated.id,
                username:isAuthenticated.username,
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
        fatchUserProfile();
    }

    
   },
   [authentication_user])

   return (
    <GoogleOAuthProvider clientId="542004528081-920qoaeaj25vg2eclgqlrr01qgoejs3o.apps.googleusercontent.com">
    <Routes>
        <Route  path="/login" element={<LoginPage/>} />
        <Route  path="/signUp" element={<SignUpPage/>} />
        <Route  path="/otp" element={<OtpPage/>} />
        <Route path="/workspace-invitation/:token/" element={<WorkspaceInvitationPage/>} />
        
       {/* private routes here  */}
        <Route path="/" element={<PrivateRoutes>  <BaseHomePage/>  </PrivateRoutes>}/>
        <Route path="/workspace" element={<PrivateRoutes>  <WorkspaceHome/>  </PrivateRoutes>} />
        <Route path="/workspace-settings" element={<PrivateRoutes>  <WorkspaceAdminSettingsPage/>  </PrivateRoutes>} />
        <Route path="/workspace-settings-members" element={<PrivateRoutes>  <WorkspaceAdminMemberManagementPage/>  </PrivateRoutes>} />
        <Route path="/workspace-channel/:groupId/" element={<PrivateRoutes><ChannelPage/></PrivateRoutes>} />
        <Route path="/workspace-dm/:memberId/" element={<PrivateRoutes><DMPage/></PrivateRoutes>}/>
        <Route path='/one-to-one-video/:roomId' element={<PrivateRoutes><OneOnOneVideoCall/> </PrivateRoutes>} />
        <Route path='/one-to-one-audio/:roomId' element={<PrivateRoutes> <OneOnOneAudioCall/> </PrivateRoutes>} />
        <Route path='/group-video/:roomId' element={<PrivateRoutes><GroupVideoCall/> </PrivateRoutes>} />
        <Route path='/group-audio/:roomId' element={<PrivateRoutes> <GroupAudioCall/> </PrivateRoutes>} />
        <Route path='/payment' element={<PrivateRoutes> <AfterPaymentPage/> </PrivateRoutes>} />
        <Route path='/chatbot' element={<PrivateRoutes> <ChatBotPage/> </PrivateRoutes>} />
    </Routes>
        </GoogleOAuthProvider>
   )
}

export default UserWrapper;




