import React, {useState} from 'react'

// components
import ChatInput from './chatInput';
import MemberManagementModal from '../ChannelComponents/MemberManagementModal'

// styled component
import styled from 'styled-components'

// material ui icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';

import EditChannelModal from '../ChannelComponents/EditChannelDetailModal';


const Chat = () => {

    

  return (
    <ChatContainer>
        <>
        <Header>
            <HeaderLeft>
                <h4><strong># Group Name</strong></h4><StarBorderIcon/>
               <p>[Description]</p>
            </HeaderLeft>
            <HeaderRight>
                <p>
                    
                    
                    <EditChannelModal/>
                    
                    <MemberManagementModal/>
                </p>
            </HeaderRight>
        </Header>

        <ChatMessages>
            {/* llisting out the messages */}
        </ChatMessages>
        <ChatInput/>
        </>

    </ChatContainer>
  )
}

export default Chat;

const Header = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom:1px solid grey;
    color:white;
    background:#3f3c42;
    border-radius:5px;
   
    `;
const HeaderLeft = styled.div`

    display:flex;
    align-items: center;
    
    >h4 {
        display:flex;
        text-transform: lowercase;
        margin-right:10px;
    }
    >h4 > .MuiSvgIcon-root {

        margin-right:20px;
        font-size: 16px;
        
    }

`;
const HeaderRight = styled.div`

    >p {
        display:flex;
        align-items: center;
        font-size:14px;
        
    }
`;

const ChatMessages = styled.div``;


const ChatContainer = styled.div`
    flex : 0.9;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top:60px;
`;
