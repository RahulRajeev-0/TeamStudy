import React from 'react';
import styled from 'styled-components';

const GroupMessage = ({ message, isSender, username }) => {
   
  return (
    <MessageContainer isSender={isSender}>
        
      <MessageInfo isSender={isSender}>
        <Nametag>{username}</Nametag>
        <span>{message}</span>
      </MessageInfo>
    </MessageContainer>
  );
};

export default GroupMessage;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  padding-${({ isSender }) => (isSender ? 'right' : 'left')}:7px; 
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')}; // Align messages to right or left based on sender
  color:white;
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  background: ${({ isSender }) => (isSender ? 'green' : 'black')};
  border-radius: 10px;
  max-width: 350px;
  word-wrap: break-word;
  text-align:left;

 
  
  > span {
    color: white;
    padding-right:5px;
    font-size:18px;

  }

`;
const Nametag = styled.div`
padding-top:5px;
padding-bottom:5px;
padding-right:5px;
color:#a9b5c7;
font-size:11px;
display:flex;
align-item:start;
font-weight:bold;
`;
