import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BotMessage from './BotMessage';

const BotChat = () => {
  const [userInfo, setUserInfo] = useState({ id: null, display_name: null, username: null, user: {} });
  const baseURL = "http://127.0.0.1:8000";
  const profile = useSelector(state => state.workspaceUserProfile);

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("")
  const [connection, setConnection] = useState(null)


  // for multimedia sending 

  const [isLoading, setIsLoading] = useState(false);
  


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Submitted message:', message) // Log the message
    try {
      setChatMessages([...chatMessages, {'message':message,'isSender':true}]);
      const response = await axios.get(baseURL + '/chatbot/chat/', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          message: message,
        },
      });

      if (response.status === 200) {
        const aiResponse = response.data;
        setChatMessages(prevMessages => [...prevMessages, aiResponse]); // Append new message to chatMessages state
        console.log(ChatMessages);
      }
    } catch (error) {
      console.log(error);
    }

    // Clear the input field after submission if needed
    setMessage('');
  };

// ---------- for the photo sending ------------------


  
  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4><strong> TeamStudy Ai </strong></h4>
          <StarBorderIcon />
        </HeaderLeft>
        <HeaderRight>

       
        

        </HeaderRight>
      </Header>
      <ChatMessages>
      
        <ChatTop/>
        {chatMessages.map((message, index) => (
         <BotMessage message={message.message} 
         isSender={message.isSender}/>
        ))}
  
  <ChatBottom/>
      </ChatMessages>
 
      <ChatInputContainer>
      <form onSubmit={handleSubmit}>

            <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Message'/>
            {/* <Button variant='outlined'><MicIcon/></Button> */}
            <Button variant="contained" endIcon={<SendIcon />} type='submit' >
            </Button>
        </form>
      </ChatInputContainer>



    </ChatContainer>
  );
};

export default BotChat;

const ChatBottom = styled.div`
padding-bottom:200px;
`;
const ChatTop = styled.div`
padding-top:100px`;


const Header = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom:1px solid grey;
    color:white;
    background:#424A86;
    border-radius:5px;
    z-index:1;
    position: fixed;
    width: 78%;
    // padding-bottom:200px;
    
   
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

    >span {
        display:flex;
        align-items: center;
        font-size:14px;
        justify-content:space-between;
        
    }
`;

const ChatMessages = styled.div``;


const ChatContainer = styled.div`
    flex : 0.9;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top:60px;
`;

const ChatInputContainer = styled.div`
position: fixed;
bottom: 0;
width: 78%;
background-color: #424A86;
border-radius:15px;
z-index: 1; /* Ensure it appears above other elements */

> form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

> form > input {
    flex: 1;
    height: 35px;
   margin-left:15px;
    border: none;
    padding: 10px;
    outline: none;
    border-radius: 10px;
    background-color: #333; /* Darker background */
    color: white;
}

> form > button {
    margin-left: 10px;
    height: 35px;
    padding: 0 15px;
    border: none;
    border-radius: 10px;
    // background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

> form > button:hover {
    background-color: #45a049;
}
`;