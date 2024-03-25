import React, {useEffect, useState} from 'react'

// react redux 
import { useSelector, useDispatch } from 'react-redux'
import { set_selected_group } from '../../../Redux/WorkspaceGroup/GroupSlice';

// components
import ChatInput from './chatInput';
import MemberManagementModal from '../ChannelComponents/MemberManagementModal'

// styled component
import styled from 'styled-components'

// material ui icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';

// modals 
import EditChannelModal from '../ChannelComponents/EditChannelDetailModal';

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

    useEffect(()=>{
        fetchGroupInfo();
    },[groupId])

  return (
    <ChatContainer>
        <>
        <Header>
            <HeaderLeft>
                <h4><strong># {groupInfo.name}</strong></h4><StarBorderIcon/>
               <p>[{groupInfo.topic}]</p>
            </HeaderLeft>
            <HeaderRight>
                <p>
                    
                    
                    <EditChannelModal groupDetails={groupDetails}/>
                    
                    <MemberManagementModal/>
                </p>
            </HeaderRight>
        </Header>

        <ChatMessages>
            {/* llisting out the messages */}
        </ChatMessages>
        <ChatInput/>
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

    >p {
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
