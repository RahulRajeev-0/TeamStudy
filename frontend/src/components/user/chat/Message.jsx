import React from 'react';
import styled from 'styled-components';

const Message = ({ message, isSender }) => {
  return (
    <MessageContainer isSender={isSender}>
      <MessageInfo isSender={isSender}>
        <span>{message}</span>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  padding-${({ isSender }) => (isSender ? 'right' : 'left')}:7px; 
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')}; // Align messages to right or left based on sender
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  background: ${({ isSender }) => (isSender ? 'green' : 'black')};
  border-radius: 10px;
  max-width: 350px;
  word-wrap: break-word;

 
  > h5 {
    color: white;
    padding: 5px;
  }
  > span {
    color: white;
    padding-right:5px;
    font-size:18px;

  }
`;
