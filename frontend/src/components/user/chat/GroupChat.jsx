// React imports
import React, { useEffect, useState, useRef } from 'react';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { set_selected_group } from '../../../Redux/WorkspaceGroup/GroupSlice'; // Assuming this is a Redux action

// Styled component import
import styled from 'styled-components';

// Material UI icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

// Modal imports
import EditChannelModal from '../ChannelComponents/EditChannelDetailModal';
import MemberManagementModal from '../ChannelComponents/MemberManagementModal';
import DeleteChannelModal from '../ChannelComponents/DeleteChannelModal';

// React Bootstrap imports
import NavDropdown from 'react-bootstrap/NavDropdown';

// WebSocket imports
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// React Router imports
import { useParams, useNavigate } from 'react-router-dom';

// Axios import for HTTP requests
import axios from 'axios';

// Toast notification import
import { toast } from 'react-toastify';

// call notifications 
import VideoCallAlert from '../GroupCalls/CallAlert/VideoCallAlert';
import AudioCallAlert from '../GroupCalls/CallAlert/AudioCallAlert';

// Custom component imports
import ChatInput from './chatInput';
import GroupMessage from './GroupMessage';


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
  const [connection, setConnection] = useState(null)
  const [chatMessages, setChatMessages] = useState([]);

  // call notifications
  const [showVideoCallAlert, setShowVideoCallAlert] = useState(false);
  const [showAudioCallAlert, setShowAudioCallAlert] = useState(false);

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
        setConnection(newConnection)
        newConnection.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        newConnection.onmessage = (message) => {
          const data = JSON.parse(message.data);
          console.log(data);

          if (data.type === 'video_call'){
            if (data.sender === profile.id){
              navigate(`/group-video/${groupId}`)
            }else{
              setShowVideoCallAlert(true)
            }
          }else if (data.type === 'audio_call'){
            if (data.sender === profile.id){
              navigate(`/group-audio/${groupId}`)
            }else{
              setShowAudioCallAlert(true)
            }

          }else{

            setChatMessages(prevMessages => [...prevMessages, data]);
          }
        };
      

        return () => {
          newConnection.close();
        };
      };

      // for image sending 
      // const uploadImageCloud = async () => {
      //   setLoading(true);
      //   const data = new FormData();
      //   data.append("file", uploadImage);
      //   data.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      //   data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
      //   data.append("folder", "Zorpia-posts");
    
      //   try {
      //     const response = await fetch(
      //       `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      //       {
      //         method: "POST",
      //         body: data,
      //       }
      //     );
      //     const res = await response.json();
    
      //     if (res.public_id) {
      //       console.log("hhh");
      //       if (profile) {
      //         // apply chating logic 
      //         setProfileImageUrl(res.public_id);
      //         setDisplayImage(res.public_id)
      //       } else {
      //         setCoverImageUrl(res.public_id);
      //       }
      //       setShowUrl(res.public_id);
      //       setLoading(false);
      //     }
      //   } catch (error) {}
      // };

      const sendMessage = (e) => {
        e.preventDefault();
        if (!connection || connection.readyState !== connection.OPEN) {
          console.error("WebSocket is not open");
          return;
        }
        const sender = profile.id;
        
        const username = userDetails.username;
        
        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = ('0' + (currentTime.getMonth() + 1)).slice(-2); // Adding 1 because getMonth returns zero-based month
        const day = ('0' + currentTime.getDate()).slice(-2);
        const hours = ('0' + currentTime.getHours()).slice(-2);
        const minutes = ('0' + currentTime.getMinutes()).slice(-2);
        const seconds = ('0' + currentTime.getSeconds()).slice(-2);

        const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const messageData = { message: inputRef.current.value, sender, username, time };
    
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
     
      setChatMessages([])
        fetchGroupInfo();
    },[groupId])


    useEffect(()=>{
        if (groupDetails.id){
            connectToWebsocket();
        }
    }, [groupDetails.id])


    // -------------------------------- call -----------------------------------
    const videoCall = ()=> {
      // const  roomId=groupId
      // navigate(`/group-video/${roomId}`)
     const sender = profile.id

      const message = {
        message: 'started video call ..📞',
        type: 'video_call',
        sender:sender,
        username:userDetails.username
      };
    
      // Send the message via WebSocket
      if (connection && connection.readyState === connection.OPEN) {
        connection.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not open');
        // Handle the case when WebSocket is not open (e.g., show an error message)
      }
    
    }
    const AudioCall = ()=> {
      // const  roomId=groupId
      // navigate(`/group-audio/${roomId}`)
      const sender = profile.id
      const message = {
        message: 'started audio call ..📞',
        type: 'audio_call',
        sender:sender,
        username:userDetails.username
      };
    
      // Send the message via WebSocket
      if (connection && connection.readyState === connection.OPEN) {
        connection.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not open');
        // Handle the case when WebSocket is not open (e.g., show an error message)
      }


    }
  
  //  -------------------------------------------------------------------------
    // function randomID(len) {
    //   let result = '';
    //   if (result) return result;
    //   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    //     maxPos = chars.length,
    //     i;
    //   len = len || 5;
    //   for (i = 0; i < len; i++) {
    //     result += chars.charAt(Math.floor(Math.random() * maxPos));
    //   }
    //   return result;
    // }
  

  return (
    <ChatContainer>
        <>
        <Header>
            <HeaderLeft>
                <h4><strong># {groupInfo.name}</strong></h4><StarBorderIcon/>
               <p>[{groupInfo.topic}]</p>
            </HeaderLeft>
            <HeaderRight>
                
            
                  
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
    time={chat.time}
    />
  ))}

  {showVideoCallAlert && <VideoCallAlert setShowVideoCallAlert={setShowVideoCallAlert} roomId={groupId} />}
  {showAudioCallAlert && <AudioCallAlert setShowAudioCallAlert={setShowAudioCallAlert} roomId={groupId} />}
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
