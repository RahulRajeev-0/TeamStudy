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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MicIcon from '@mui/icons-material/Mic';

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

// react boostrap 
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';


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
  const workspaceDetails = useSelector(state => state.user_workspace_select);

    const inputRef = useRef(null);
  const [connection, setConnection] = useState(null)
  const [chatMessages, setChatMessages] = useState([]);

  // call notifications
  const [showVideoCallAlert, setShowVideoCallAlert] = useState(false);
  const [showAudioCallAlert, setShowAudioCallAlert] = useState(false);


  // for multimedia sending 

  const [isLoading, setIsLoading] = useState(false);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null);
  
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
      if (workspaceDetails.isPremium){

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
      else{
        toast.warning("Please Upgrade to Premium Workspace To Enjoy Group Video and Audio Call Features")
      }
    
    }
    const AudioCall = ()=> {
      // const  roomId=groupId
      // navigate(`/group-audio/${roomId}`)

      if (workspaceDetails.isPremium){

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
      }else{
        toast.warning("Please Upgrade to Premium Workspace To Enjoy Group Video and Audio Call Features")

      }


    }
  
  
  const handlePhotoClick = () => {
      if (photoInputRef.current){
        photoInputRef.current.click()
       
    }
     
  };

  // ---------- for the photo sending ------------------
  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return; // Handle empty selection (optional)
    }
    
    setIsLoading(true);
    if (selectedFile.size > 2 * 1024 * 1024) { // Check for 3 MB limit
      toast.error("You can only send image less than 2 mb ")
      setIsLoading(false)
      return; // Prevent further processing
    }

    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset","TeamStudy");
    formData.append("cloud_name","doafvjkhf");
    formData.append("folder", "TeamStudy");

   
      //   data.append("file", uploadImage);
      //   data.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      //   data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
      //   data.append("folder", "Zorpia-posts");

    fetch("https://api.cloudinary.com/v1_1/doafvjkhf/image/upload", {
      method:"post",
      body:formData
    }).then((res)=>res.json()).then((data)=>{
      setIsLoading(false);
      console.log(data.public_id);
      // if the image is uploaded successfully then send the message
      if (data.public_id){
        const sender = profile.id

      const message = {
        message: data.public_id,
        type: 'photo',
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
      
    }).catch((err)=>{
      setIsLoading(false);
      console.log(err);
    })

    // Handle valid photo selection (e.g., upload to server)
    // ... your upload logic here ...
  };

  const handleVideoChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (!selectedFile) {
      return; // Handle empty selection (optional)
    }
    
    setIsLoading(true);
    if (selectedFile.size > 50 * 1024 * 1024) { // Check for 50 MB limit
      toast.error("You can only send video files less than 50 MB");
      setIsLoading(false);
      return; // Prevent further processing
    }
  
    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset","TeamStudy");
    formData.append("cloud_name","doafvjkhf");
    formData.append("folder", "TeamStudy");
  
    fetch("https://api.cloudinary.com/v1_1/doafvjkhf/video/upload", {
      method:"post",
      body:formData
    }).then((res)=>res.json()).then((data)=>{
      setIsLoading(false);
      console.log(data);
      // If the video is uploaded successfully, send the message
      if (data.public_id){
        const sender = profile.id;
  
        const message = {
          message: data.secure_url,
          type: 'video',
          sender: sender,
          username: userDetails.username
        };
      
        // Send the message via WebSocket
        if (connection && connection.readyState === connection.OPEN) {
          connection.send(JSON.stringify(message));
        } else {
          console.error('WebSocket is not open');
          // Handle the case when WebSocket is not open (e.g., show an error message)
        }
      }
    }).catch((err)=>{
      setIsLoading(false);
      console.log(err);
    });
  };
  
  
    const handleVideoClick = () => {
      videoInputRef.current.click();
  };
  //   const handleAudioClick = () => {
  //     InputRef.current.click();
  // };
    const handleFileClick = () => {
      fileInputRef.current.click();
  };



  
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
<ChatTop/>
  {/* Listing out the messages */}
  {chatMessages.map((chat, index) => (
    <GroupMessage
      key={index}
      message={chat.message}
      isSender={chat.sender === profile.id} // Add a prop to identify if the sender is the current user
    username={chat.username}
    type={chat.type}
    time={chat.time}
    />
  ))}

  {showVideoCallAlert && <VideoCallAlert setShowVideoCallAlert={setShowVideoCallAlert} roomId={groupId} />}
  {showAudioCallAlert && <AudioCallAlert setShowAudioCallAlert={setShowAudioCallAlert} roomId={groupId} />}
  <ChatBottom />
</ChatMessages>

        <ChatInputContainer>
        <form>
        {isLoading ? ( // If loading is true, render a different button
  <Button variant="secondary" onClick={() => {}}>
    Loading...
  </Button>
) : ( // If loading is false, render the attachment button
  <DropdownButton
    drop='up'
    variant="secondary"
    title={<AttachFileIcon/>}
  >
    <Dropdown.Item eventKey="1" onClick={handlePhotoClick}><InsertPhotoIcon/> Photo</Dropdown.Item>
    <Dropdown.Item eventKey="2" onClick={handleVideoClick}><VideoFileIcon/> Video</Dropdown.Item>
    {/* <Dropdown.Item eventKey="3" onClick={handleAudioClick}><AudioFileIcon/> Audio</Dropdown.Item> */}
    <input
      ref={photoInputRef}
      id="fileInput"
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      style={{ display: 'none' }} // Hide the input
    />
    <input
      ref={videoInputRef}
      id="fileInput"
      type="file"
      onChange={handleVideoChange}
      accept="video/*"
      style={{ display: 'none' }} // Hide the input
    />
    <input
      ref={fileInputRef}
      id="fileInput"
      type="file"
      accept="audio/*"
      style={{ display: 'none' }} // Hide the input
    />
    <Dropdown.Divider />
    <Dropdown.Item eventKey="4"><InsertDriveFileIcon/> file</Dropdown.Item>
  </DropdownButton>
)}

            <input ref={inputRef} placeholder='Message'/>
            <Button variant='outlined'><MicIcon/></Button>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' onClick={sendMessage}>
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

color:white;
background:#424A86;
border-radius:10px;
position: fixed;
width: 78%;
z-index:2;
    
   
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


    const ChatBottom = styled.div`
padding-bottom:200px;
`;

const ChatTop = styled.div`
padding-top:100px`;
