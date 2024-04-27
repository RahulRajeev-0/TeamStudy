import React from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import WorkspaceInfo from '../../../components/user/workspaceContent/workspaceInfo'
import styled from 'styled-components'

// axios 
import axios from "axios"

const WorkspaceHome = () => {
  
  return (
    <>
      <WorkspaceHeader/>
      <WorkspaceBody>
        <WorkSpaceSideBar/>
        <WorkspaceContent>
          <WorkspaceInfo/>
        </WorkspaceContent>
      </WorkspaceBody>
    </>
  )
}

export default WorkspaceHome;

const WorkspaceBody = styled.div`
  display: flex;
  height: 100vh;
`;

const WorkspaceContent = styled.div`
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);
background-size: cover;
  flex: 0.8; /* Adjust the width as needed */
  padding: 60px; /* Add padding for spacing */
  overflow-y: auto; /* Add scroll if content exceeds container height */
`;
