import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
// import Accordion from 'react-bootstrap/Accordion';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';


import SettingsIcon from '@mui/icons-material/Settings';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ChannelAccordion from './Accordion/ChannelAccordion';
import DMAccordion from './Accordion/DMAccordion'

import { toast } from 'react-toastify';

// react router dom 
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// 
import UnlockButton from '../premiumWorkspace/UnlockPremiumButton';
import KeepMountedModal from '../premiumWorkspace/PremiumModal';
import SparkleButton from '../chatBot/ChatbotButton';

//  redux and redux store 
import { useSelector } from 'react-redux'


import { jwtDecode } from "jwt-decode";

import axios from 'axios';



const WorkSpaceSideBar = () => {

  const baseURL = import.meta.env.VITE_API_BASE_URL

  const [activeIndex, setActiveIndex] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
 
  const navigate = useNavigate();
 

  const workspaceDetails = useSelector(state => state.user_workspace_select);
  const userProfileDetails = useSelector(state => state.workspaceUserProfile);
  const username =  jwtDecode(localStorage.getItem('access')).username
  
  
 useEffect(()=>{
  console.log(userProfileDetails.isAdmin)
 },[])

  const workspaceLogout = () => {
    navigate('/')
    sessionStorage.setItem("workspaceId", null)
    toast.success("Logged out of Workspace")
  }

  const chatBot = () =>{
    console.log('working');
    if (workspaceDetails.isPremium){
      navigate('/chatbot')
    }else{
      toast("Unlock premium to use chat bot")
    }
  }

  
  const userLeaveWorkspace = async () =>{
    
    const token = localStorage.getItem('access')
      try {
          const response = await axios.delete(baseURL+'/workspace/member-leave-workspace/', {
              headers: {
                  Authorization: `Bearer ${token}`
              },
              data: {
                workspaceId: workspaceDetails.workspaceId // Include workspaceId in request body if required
            }
          });

          if (response.status === 200) {
              toast.success(response.data.message);
              navigate('/')
          }

          
      } catch (error) {
          if (error.response && error.response.status === 403) {
              toast(error.response.data.message);
          }
          console.log(error);
      }
  }

  return (
    <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo onClick={()=>navigate('/workspace')}>
                <h2>{workspaceDetails.workspaceName} </h2>
                  <h3>
                    <FiberManualRecordIcon/>
                      {username}
                      
                </h3> 
                
          </SidebarInfo>
                
                      
        </SidebarHeader>
                  
       
        <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Workspace options"
                        menuVariant="dark"
                        style={{paddingLeft:"15px", paddingTop:"5px"}}
                      >
                        
                        
                       
                        <NavDropdown.Item  onClick={workspaceLogout}>
                        <LogoutIcon/> Log out from Workspace
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                        <NavDropdown.Divider />
                        {userProfileDetails.isAdmin === true && (
                        <NavDropdown.Item onClick={() => {navigate('/workspace-settings')}}>
                          <SettingsIcon/> Settings and Administration
                        </NavDropdown.Item>
                      )}

                        
                        <NavDropdown.Item onClick={handleShow}>
                          <ExitToAppIcon  style={{color:"red"}}/> Leave Workspace
                        </NavDropdown.Item>
                      </NavDropdown>
        
    
 

<hr/>

<ChannelAccordion/>
<hr/>
<DMAccordion/>

<hr/>

<div onClick={chatBot} style={{display:'flex', alignItems:'center', flexDirection:'column'}}>

<SparkleButton  />
</div>

<hr/>
{!workspaceDetails.isPremium && (
                <div>
                    <KeepMountedModal />
                    <hr />
                </div>
            )}
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure you want to leave {workspaceDetails.workspaceName}  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={userLeaveWorkspace}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>

    </SidebarContainer>
  )
}

export default WorkSpaceSideBar;




const SidebarContainer = styled.div`
    color:white;
    background: #13101f;
    // background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);    
    flex:0.3;
    border-top:1px solid #49274b;
    max-width:260px;
    margin-top:45px;
    overflow-y: auto; /* Add this line to enable vertical scrolling */

    > NavDropdown{
      padding-left: 5px;
    }
    >span{
      cursor:pointer;
    }

    .accordion-body {
      background-color: transparent;
    }
`;


const SidebarHeader = styled.div`
  display:flex;
  border-bottom:1px solid #49274b;

  >.MuiSvgIcon-root {
    
    color:black;
    font-size:25px;
   background:white;
   border-radius:999px;
    
  }
`;

const SidebarInfo = styled.div` 
  flex:1;
  cursor:pointer;

  >h2{
    font-size:20px;
    padding-top:5px;
    padding-left:15px;
    font-weight:900;
    margin-bottom: 5px;
  }
  >h3{
    display:flex;
    padding-top:5px;
    padding-left:15px;
    font-size:13px;
    font-weight:400;
    align-items:center;

  }

  > h3 > .MuiSvgIcon-root{
    font-size:14px;
    margin-top:1px;
    margin-right:2px;
    color:green;
  }

`;


