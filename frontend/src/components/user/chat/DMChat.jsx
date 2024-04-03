import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket, connection } from 'websocket';
import Message from './Message';


const DMChat = () => {
  const [userInfo, setUserInfo] = useState({ id: null, display_name: null, username: null, user: {} });
  const baseURL = "http://127.0.0.1:8000";
  const chatRef = useRef();
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const navigate = useNavigate();
  const profile = useSelector(state => state.workspaceUserProfile);

  const [chatMessages, setChatMessages] = useState([]);
  const inputRef = useRef(null);
  const connectionRef = useRef(null);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${baseURL}/dm/userbasic-info/${memberId}/`, {
        params: { request_Id: profile.id },
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  // function to connect to the websocket
  const connectToWebsocket = () => {
    const newConnection = new W3CWebSocket(`ws://127.0.0.1:8000/ws/dm_chats/${profile.id}/${userInfo.id}/`);
    newConnection.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    newConnection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setChatMessages(prevMessages => [...prevMessages, data]);
    };
    connectionRef.current = newConnection;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const { current: connection } = connectionRef;
    if (!connection || connection.readyState !== connection.OPEN) {
      console.error("WebSocket is not open");
      return;
    }
    const sender = profile.id;
    const messageData = { message: inputRef.current.value, sender };

    const messageString = JSON.stringify(messageData);

    console.log("Sending Message:", messageString);
    connection.send(messageString);
    inputRef.current.value = "";
    setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  };

  useEffect(() => {
    fetchUserInfo();
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
   
  }, [memberId]);

  useEffect(() => {
    if (userInfo.id) {
      connectToWebsocket();
    }
    
  }, [userInfo.id]);

  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4><strong>#{userInfo.user.username} ({userInfo.display_name})</strong></h4>
          <StarBorderIcon />
        </HeaderLeft>
      </Header>
      <ChatMessages>
        <ChatTop/>
      {chatMessages.map((chat, index) => (
    <Message
      key={index}
      message={chat.message}
      // username={chat.username}
      isSender={chat.sender === profile.id} // Add a prop to identify if the sender is the current user
    />
  ))} <ChatBottom/>
      </ChatMessages>
 
      <ChatInputContainer>
        <form>
          <input ref={inputRef} placeholder='Message' />
          <Button variant="contained" endIcon={<SendIcon />} type='submit' onClick={sendMessage}>
            Send
          </Button>
        </form>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default DMChat;

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
    background:#3f3c42;
    border-radius:5px;
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
  
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    height: 35px;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
    border-radius: 10px;
  }
  > form > Button {
    position: fixed;
    bottom: 34px;
    left: 1150px;
  }
`;
