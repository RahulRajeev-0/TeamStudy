import React from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import BotChat from '../../../components/user/chatBot/ChatbotChatArea'
import styled from 'styled-components'


const ChatBotPage = () => {
    return (
      <>
        <WorkspaceHeader/>
        <WorkspaceBody>
          <WorkSpaceSideBar/>
         
            <BotChat/>
         
        </WorkspaceBody>
      </>
    )
  }
  
  export default ChatBotPage
  const WorkspaceBody = styled.div`
    display: flex;
    height: 100vh;
    
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);
    background-size: cover;
    `;
  