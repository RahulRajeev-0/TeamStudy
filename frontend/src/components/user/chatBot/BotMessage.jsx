import React from 'react';
import styled from 'styled-components';



const BotMessage = ({ message, isSender, time }) => {

 

  return (
    <MessageContainer isSender={isSender}>
      <MessageInfo isSender={isSender}>
        <span>{message}</span>
      </MessageInfo>
    </MessageContainer>
  );
};

export default BotMessage;

const MessageContainer = styled.div`
display: flex;
align-items: center;
padding: 3px;
padding-${({ isSender }) => (isSender ? 'right' : 'left')}:7px; 
justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
color: white;
`;

const MessageInfo = styled.div`
padding-left: 10px;
background: ${({ isSender }) => (isSender ? '#4E1B8C' : '#8c67a6')};
border-radius: 10px;
max-width: 350px;
word-wrap: break-word;
text-align: left;

> span {
  color: white;
  padding-right: 5px;
  font-size: 18px;
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