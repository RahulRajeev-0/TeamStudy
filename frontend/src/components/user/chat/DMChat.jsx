import React, {useEffect, useState} from 'react'

// react redux 
import { useSelector, useDispatch } from 'react-redux'
// import { set_selected_group } from '../../../Redux/WorkspaceGroup/GroupSlice';

// components
import ChatInput from './chatInput';

// styled component
import styled from 'styled-components'

// material ui icons
import StarBorderIcon from '@mui/icons-material/StarBorder';




import {  useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DMChat = () => {
    const [userInfo, setUserInfo] = useState({id:null, display_name:null, username:null, user:{}})
    const baseURL = "http://127.0.0.1:8000"
    
    const dispatch = useDispatch();
    const {memberId} = useParams();
    const navigate = useNavigate();
   
    const profile = useSelector(state => state.workspaceUserProfile);
    
    // api for fetching the group info (name, description, topic)
    const fetchUserInfo = async () => {
        try{
            
            const token = localStorage.getItem('access');
            console.log(token)
            


            const response = await axios.get(baseURL + `/dm/userbasic-info/${memberId}/`,
            {
                params: {
                    request_Id: profile.id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
            
           
            setUserInfo(response.data)
            
        }catch(error){
            // if (error.response && error.response.status === 403){
            //     toast.warning(error.response.data.message)
            //     navigate('/workspace')
            // }
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchUserInfo();
    },[memberId])

  return (
    <ChatContainer>
        <>
        <Header>
            <HeaderLeft>
                <h4><strong>#{userInfo.user.username}  ({userInfo.display_name})</strong></h4><StarBorderIcon/>
               
            </HeaderLeft>
            <HeaderRight>
                
            
                  
                    
                    
                    
                   
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

export default DMChat;

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
