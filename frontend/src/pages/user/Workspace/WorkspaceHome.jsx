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
  background:#282626;
  flex: 0.8; /* Adjust the width as needed */
  padding: 60px; /* Add padding for spacing */
  overflow-y: auto; /* Add scroll if content exceeds container height */
`;
