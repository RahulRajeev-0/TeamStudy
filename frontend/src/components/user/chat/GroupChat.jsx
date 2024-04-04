import React, {useEffect, useState, useRef} from 'react'

// react redux 
import { useSelector, useDispatch } from 'react-redux'
import { set_selected_group } from '../../../Redux/WorkspaceGroup/GroupSlice';

// components
import ChatInput from './chatInput';
import GroupMessage from './GroupMessage';

// styled component
import styled from 'styled-components'

// material ui icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
// modals 
import EditChannelModal from '../ChannelComponents/EditChannelDetailModal';
import MemberManagementModal from '../ChannelComponents/MemberManagementModal'
import DeleteChannelModal from '../ChannelComponents/DeleteChannelModal'

import NavDropdown from 'react-bootstrap/NavDropdown';
// websocket
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import {  useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Chat = () => {
    const [groupInfo, setGroupInfo] = useState({id:null, name:null, topic:null, description:null})
    const baseURL = "http://127.0.0.1:8000"
    const token = localStorage.getItem('access');
    const dispatch = useDispatch();
    const {groupId} = useParams();
    const navigate = useNavigate();
   
    const profile = useSelector(state => state.workspaceUserProfile);
    const groupDetails = useSelector(state =>state.user_select_group);
    const userDetails = useSelector(state=>state.authenticationUser);

    const inputRef = useRef(null);
  const connectionRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);

    // api for fetching the group info (name, description, topic)
    const fetchGroupInfo = async () => {
        try{
            const response = await axios.get(baseURL + `/group/workspace-group/${groupId}/${profile.id}/`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
           
            setGroupInfo(response.data)
            dispatch(set_selected_group(response.data))
        }catch(error){
            if (error.response && error.response.status === 403){
                toast.warning(error.response.data.message)
                navigate('/workspace')
            }
            console.log(error);
        }
    }

    // websocket connection 
    const connectToWebsocket = () => {
        const newConnection = new W3CWebSocket(`ws://127.0.0.1:8000/ws/group_chats/${groupDetails.id}/`);
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
        
        const username = userDetails.username;
        const messageData = { message: inputRef.current.value, sender, username };
    
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

    
    useEffect(()=>{
        fetchGroupInfo();
    },[groupId])


    useEffect(()=>{
        if (groupDetails.id){
            connectToWebsocket();
        }
    }, [groupDetails.id])

    const videoCall = ()=> {
      const  roomId=groupId
      navigate(`/group-video/${roomId}`)
    }
    const AudioCall = ()=> {
      const  roomId=groupId
      navigate(`/group-audio/${roomId}`)
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
  

  return (
    <ChatContainer>
        <>
        <Header>
            <HeaderLeft>
                <h4><strong># {groupInfo.name}</strong></h4><StarBorderIcon/>
               <p>[{groupInfo.topic}]</p>
            </HeaderLeft>
            <HeaderRight>
                
            
                  
            <IconButton color="secondary" onClick={videoCall} aria-label="add to shopping cart">
          <VideoCallIcon/>
      </IconButton>

        <IconButton color="primary" onClick={AudioCall} aria-label="add to shopping cart">
        
          
          <CallIcon/>
      </IconButton>
                    {profile.isAdmin === true &&(
                      
                        <span>
                          <NavDropdown
              id="nav-dropdown-dark-example"
              title="Settings"
              menuVariant="dark"
            >
              <NavDropdown.Item><EditChannelModal/></NavDropdown.Item>
              <NavDropdown.Item>
              <MemberManagementModal/>
              </NavDropdown.Item>
              <NavDropdown.Item >  <DeleteChannelModal/></NavDropdown.Item>
             
            </NavDropdown>
                        
                    
                  
                  
                    </span>  
                    )}
                
                    
                   
            </HeaderRight>
        </Header>

        // In the Chat component
<ChatMessages>
  {/* Listing out the messages */}
  {chatMessages.map((chat, index) => (
    <GroupMessage
      key={index}
      message={chat.message}
      isSender={chat.sender === profile.id} // Add a prop to identify if the sender is the current user
    username={chat.username}
    />
  ))}
  <ChatBottom />
</ChatMessages>

        <ChatInputContainer>
        <form>
            <input ref={inputRef} placeholder='Message'/>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' onClick={sendMessage}>
                send
            </Button>
        </form>
    </ChatInputContainer>
        </>

    </ChatContainer>
  )
}

export default Chat;

const Header = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom:1px solid grey;
    color:white;
    background:#3f3c42;
    border-radius:5px;
   
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
            bottom:30px;
            width:60%;
            height:35px;
            border: 1px solid gray;
            padding: 20px;
            outline:none;
            border-radius: 10px;
        }

        > form > Button {
            position : fixed;
            bottom: 34px;
            left: 1150px;
        }
    `;

    const ChatBottom = styled.div`
padding-bottom:200px;
`;
