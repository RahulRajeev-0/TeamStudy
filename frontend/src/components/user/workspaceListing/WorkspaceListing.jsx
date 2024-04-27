// WorkspaceList.jsx

import React from 'react';
import './WorkspaceListing.css';

import { useDispatch } from "react-redux";
import axios from "axios";
import LaunchButton from '../LunchButton/LaunchButton';

//  router 
import { useNavigate } from 'react-router-dom';

// redux store slice 
import { set_selected_workspace } from '../../../Redux/WorkspaceBaseDetails/workspaceBaseDetailsSlice';
import { set_display_name } from '../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_phone_no } from '../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_is_admin } from '../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_about_me } from '../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_profile_pic } from '../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_id } from '../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';

const WorkspaceList = ({ workspaces }) => {

  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000"
  const token = localStorage.getItem('access');
  const dispatch = useDispatch();
  

 

 

  const fetchWorkspaces = async () => {
        console.log("runinng")
  const workspaceId = sessionStorage.getItem('workspaceId')

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

  const fatchUserProfile = async () => {
  const workspaceId = sessionStorage.getItem('workspaceId')

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
      console.log(error);
    }
  }
  
  const launchWorkspace = (workspace)=>{
    sessionStorage.setItem('workspaceId', workspace.id);
    fetchWorkspaces();
    fatchUserProfile();
    navigate('/workspace')

  }
  
 
  return (
    <div className='workspace-list'>
      <h2>Your Workspaces</h2>
      <ul className='workspace-items'>
        {workspaces.map(workspace => (
          <li key={workspace.id} className='workspace-item'>
            {/* <img src={workspace.logo} alt={`Logo for ${workspace.name}`} /> */}
            <div className='workspace-details'>
            <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '250px' }}>{workspace.workspace_name}</h3>


              <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px' }}>{workspace.description}</p>
            </div>
            <sapn onClick={()=>launchWorkspace(workspace)}><LaunchButton/></sapn>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
