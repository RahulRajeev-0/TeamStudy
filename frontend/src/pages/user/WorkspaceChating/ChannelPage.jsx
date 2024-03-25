import React from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import Chat from "../../../components/user/chat/chat"
import styled from 'styled-components'

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
  background:#282626;
`;


