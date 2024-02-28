import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import styled from 'styled-components'

// axios 
import axios from "axios"


const WorkspaceHome = () => {
  
  const baseURL = 'http://127.0.0.1:8000'
  const workspaceId = sessionStorage.getItem('workspaceId')
  const token = localStorage.getItem('access')
  const [workspaceDetails, setWorkspaceDetails] = useState({});
  
  const fetchWorkspaceDetails = async()=>{
    const response = await axios.get(baseURL+`/workspace/user-workspace-details/${workspaceId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200){
      console.log(response.data);
      setWorkspaceDetails(response.data)
      
    }else{
      return {}
    }
  }

  useEffect(  () => {
      fetchWorkspaceDetails();
    
  }, []);
  
  return (
    <>
      <WorkspaceHeader/>
      <WorkspaceBody>
      <WorkSpaceSideBar workspaceDetails={workspaceDetails}/>

      </WorkspaceBody>

 
    </>
  )
}

export default WorkspaceHome;

const WorkspaceBody = styled.div`
  display:flex;
  height:100vh;
`
