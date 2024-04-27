import React, {useState} from 'react';
import styled from 'styled-components';

// Date time functions import from date-fns
import { formatDistance, subDays } from "date-fns";

const DirectMessage = ({ message, isSender, time, type }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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
    <>
    <MessageContainer isSender={isSender}>
      <MessageInfo isSender={isSender}>
      {type === 'photo' ? (
        
        <StyledImage src={`https://res.cloudinary.com/doafvjkhf/${message}`} alt="Group message"  onClick={handleImageClick}/>
        
    ) : type === 'video' ? (
      
      <StyledVideo src={message} alt="Group video" controls />
      
    ) : (
      <span>{message}</span>
    )}
        <Nametag>{formatTime(time)}</Nametag>
      </MessageInfo>
    </MessageContainer>

    {isModalOpen && (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={closeModal}>Close</CloseButton>
      <FullscreenImage src={`https://res.cloudinary.com/doafvjkhf/${message}`} alt="Group message" />
    </ModalContent>
  </ModalOverlay>
)}
      </>
  );

};

export default DirectMessage;

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

const StyledImage = styled.img`
 max-width: 150px; /* Adjust the maximum width as per your preference */
 max-height: 160px; /* Adjust the maximum height as per your preference */
 margin: 0 10px;
 width: auto;
 border-radius:5px;
 height: auto;
`;

const StyledVideo = styled.video`
  max-width: 250px; /* Adjust the maximum width as per your preference */
  max-height: 200px; /* Adjust the maximum height as per your preference */
  margin: 0 10px;
  width: auto;
  border-radius:5px;
  height: auto;
  z-index: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
 
`;

const FullscreenImage = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
  /* Other styles for the close button */
`;
