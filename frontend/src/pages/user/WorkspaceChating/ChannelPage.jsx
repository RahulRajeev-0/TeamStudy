import React from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import Chat from "../../../components/user/chat/GroupChat"
import styled from 'styled-components'

import backgroundPic from '../../../../../chatBackground.jpeg'

const ChannelPage = () => {
  return (
    <>
      <WorkspaceHeader/>
      <WorkspaceBody>
        <WorkSpaceSideBar/>
       
          <Chat/>
       
      </WorkspaceBody>
    </>
  )
}

export default ChannelPage;

const WorkspaceBody = styled.div`
  display: flex;
  height: 100vh;
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);
  background-size: cover;
`;


