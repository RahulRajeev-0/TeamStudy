import React from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import DMChat from "../../../components/user/chat/DMChat"
import styled from 'styled-components'
// import backgroundImage from "../../../../../chatBackground.jpg"

const ChannelPage = () => {
  return (
    <>
      <WorkspaceHeader/>
      <WorkspaceBody>
        <WorkSpaceSideBar/>
       
          <DMChat/>
       
      </WorkspaceBody>
    </>
  )
}

export default ChannelPage;

const WorkspaceBody = styled.div`
  display: flex;
  height: 100vh;
  
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);
  background-size: cover;
  
  
  
  
`;


