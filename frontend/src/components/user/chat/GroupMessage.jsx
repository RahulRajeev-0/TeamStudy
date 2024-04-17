import React from 'react';
import styled from 'styled-components';
import { formatDistance, subDays } from "date-fns";

const GroupMessage = ({ message, isSender, username, time, type }) => {
   
  function formatTime(timeString) {
    try {
      const time = new Date(timeString);
      const now = new Date();
      const formattedDistance = formatDistance(time, now, { includeSeconds: true });
      return formattedDistance;
    } catch (error) {
      console.error("Error formatting time:", error);
      const time = new Date();
      const now = new Date();
      const formattedDistance = formatDistance(time, now, { includeSeconds: true });
      return formattedDistance;
    }
  }
  
  return (
    <MessageContainer isSender={isSender}>
      <MessageInfo isSender={isSender}>
        <Nametag>{username}</Nametag>
        {type === 'photo' ? (
           <a a href={`https://res.cloudinary.com/doafvjkhf/${message}`} target="_blank" rel="noopener noreferrer">
          <StyledImage src={`https://res.cloudinary.com/doafvjkhf/${message}`} alt="Group message"  />
          </a>
        ) : (
          <span>{message}</span>
        )}
        <Nametag>{formatTime(time)}</Nametag>
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
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
  color: white;
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  background: ${({ isSender }) => (isSender ? 'green' : 'black')};
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
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  color: #a9b5c7;
  font-size: 11px;
  display: flex;
  align-items: start;
  font-weight: bold;
`;

const StyledImage = styled.img`
 max-width: 150px; /* Adjust the maximum width as per your preference */
 max-height: 160px; /* Adjust the maximum height as per your preference */

 width: auto;
 height: auto;
`;
