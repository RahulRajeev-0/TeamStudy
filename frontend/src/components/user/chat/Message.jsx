import React from 'react';
import styled from 'styled-components';

// Date time functions import from date-fns
import { formatDistance, subDays } from "date-fns";

const Message = ({ message, isSender, time }) => {

  function formatTime(timeString) {
    // console.log('time stamp =', timeString);
    try {
      // Parse the time string into a JavaScript Date object
      const time = new Date(timeString);
  
      // Get the current date and time
      const now = new Date();
  
      // Format the distance between the time and now
      const formattedDistance = formatDistance(time, now, { includeSeconds: true });
  
      return formattedDistance;
    } catch (error) {
      console.error("Error formatting time:", error);
      const time = new Date();
      const now = new Date();
      const formattedDistance = formatDistance(time, now, { includeSeconds: true });
      return formattedDistance; // Return a default value or handle the error condition
    }
  }

  return (
    <MessageContainer isSender={isSender}>
      <MessageInfo isSender={isSender}>
        <span>{message}</span>
        <Nametag>{formatTime(time)}</Nametag>
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

