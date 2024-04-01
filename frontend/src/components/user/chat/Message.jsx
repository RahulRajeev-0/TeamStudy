import React from 'react';
import styled from 'styled-components';

const Message = ({ message, username, isSender }) => {
  return (
    <MessageContainer isSender={isSender}>
      <MessageInfo>
        <h5>
          {message}
          <span>time </span>
        </h5>
        <p>{username}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')}; // Align messages to right or left based on sender
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  background: ${({ isSender }) => (isSender ? 'green' : 'violet')}; // Set background color based on sender
  border-radius: 10px;

  > h5 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
  > h5 {
    color: white;
    padding: 5px;
  }
  > p {
    color: white;
    padding: 5px;
  }
`;
