import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket, connection } from 'websocket';
import Message from './Message';

import IconButton from '@mui/material/IconButton';

import VideoCallAlert from '../OneOnOneVideo/VideoCallAlert'
import AudioCallAlert from '../OneOnOneAudio/AudioCallAlert';

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
  const [connection, setConnection] = useState(null)

  const [showVideoCallAlert, setShowVideoCallAlert] = useState(false);
  const [showAudioCallAlert, setShowAudioCallAlert] = useState(false);
  const [room_id, setRoom_id] = useState(null)

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
    if (memberId) {
      const newConnection = new W3CWebSocket(`ws://127.0.0.1:8000/ws/dm_chats/${profile.id}/${userInfo.id}/`);
  
      newConnection.onopen = () => {
        console.log('WebSocket Client Connected');
      };
  
      setConnection(newConnection);
  
      newConnection.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(message);
  
        // Check if it's a video call message and extract the roomId
        if (data.type === 'video_call') {
          const roomId = data.link;
          if (data.sender === profile.id){

            navigate(`/one-to-one-video/${roomId}`)
          }else{
            setRoom_id(roomId)
           setShowVideoCallAlert(true)
          }
          // Handle the received roomId as needed
         
        }
        else if (data.type === 'audio_call') { 
          const roomId = data.link;
          if (data.sender === profile.id){

            navigate(`/one-to-one-audio/${roomId}`)
          }else{
            setRoom_id(roomId)
           setShowAudioCallAlert(true)
          }
        } else {
          // Regular chat message
          setChatMessages(prevMessages => [...prevMessages, data]);
        }
      };
    }
  };
  

  const sendMessage = (e) => {
    e.preventDefault();
    if (!connection || connection.readyState !== connection.OPEN) {
      console.error("WebSocket is not open");
      return;
    }
    const sender = profile.id;

    const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = ('0' + (currentTime.getMonth() + 1)).slice(-2); // Adding 1 because getMonth returns zero-based month
        const day = ('0' + currentTime.getDate()).slice(-2);
        const hours = ('0' + currentTime.getHours()).slice(-2);
        const minutes = ('0' + currentTime.getMinutes()).slice(-2);
        const seconds = ('0' + currentTime.getSeconds()).slice(-2);

        const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const messageData = { message: inputRef.current.value, sender, time };

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


  const videoCall = ()=> {
    const roomId=randomID(10)
    
    const message = {
      message: 'started video call ..📞',
      link: roomId,
      type: 'video_call',
      sender:profile.id
    };
  
    // Send the message via WebSocket
    if (connection && connection.readyState === connection.OPEN) {
      connection.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
      // Handle the case when WebSocket is not open (e.g., show an error message)
    }
  
  
    // navigate(`/one-to-one-video/${roomId}/${memberId}`)
  }
  const AudioCall = ()=> {
    const roomId = randomID(10)

    const message = {
      message: 'started audio call ..📞',
      link: roomId,
      type: 'audio_call',
      sender:profile.id
    };
  
    // Send the message via WebSocket
    if (connection && connection.readyState === connection.OPEN) {
      connection.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
      // Handle the case when WebSocket is not open (e.g., show an error message)
    }
    
  }


  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  useEffect(() => {
    fetchUserInfo();
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
    setChatMessages([])
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
        <HeaderRight>

        {/* call option  */}
        {!showVideoCallAlert && !showAudioCallAlert && (
  <>
    <IconButton color="secondary" onClick={videoCall} aria-label="Video Call">
      <VideoCallIcon />
    </IconButton>
    <IconButton color="primary" onClick={AudioCall} aria-label="Audio Call">
      <CallIcon />
    </IconButton>
  </>
)}

        </HeaderRight>
      </Header>
      <ChatMessages>
      
        <ChatTop/>
      {chatMessages.map((chat, index) => (
    <Message
      key={index}
      message={chat.message}
      time={chat.time}
      isSender={chat.sender === profile.id} // Add a prop to identify if the sender is the current user
    />
    
  ))} 
  {showVideoCallAlert && <VideoCallAlert setShowVideoCallAlert={setShowVideoCallAlert} roomId={room_id} />}
  {showAudioCallAlert && <AudioCallAlert setShowAudioCallAlert={setShowAudioCallAlert} roomId={room_id} />}
  <ChatBottom/>
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
