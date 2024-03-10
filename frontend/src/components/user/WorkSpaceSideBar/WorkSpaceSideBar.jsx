import React, {useState} from 'react'
import styled from 'styled-components';

import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import SettingsIcon from '@mui/icons-material/Settings';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

// react router dom 
import { useNavigate } from 'react-router-dom';

import axios from "axios"

//  redux
import { useSelector } from 'react-redux'
import { set_selected_workspace } from '../../../Redux/WorkspaceBaseDetails/workspaceBaseDetailsSlice';

import { jwtDecode } from "jwt-decode";
import Logout from '@mui/icons-material/Logout';




const WorkSpaceSideBar = ({workspaceDetails}) => {

  //  for adding members to modal the workspace
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const baseURL = 'http://127.0.0.1:8000'

  const workspacename = workspaceDetails.workspace_name
  const username =  jwtDecode(localStorage.getItem('access')).username
  
  
  // user add to workspace request function 
  const addMember = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem('access')
    const formData = new FormData();
    formData.append('workspaceId',workspaceDetails.id)
    formData.append('newMember',e.target.Memmber.value)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
    };
    try{

      const response = await axios.post(baseURL+'/workspace/invite-user/',formData,{headers});
      if (response.status === 200){
        toast.success("request send successfully")
        setShow(false)
      }
      
    }
    catch(error){
      if (error.response && (error.response.status === 404 || error.response.status === 403) ){
        toast.error(error.response.data.message);
      } else {
        console.error(error);
      }
    }
    
  }


  const workspaceLogout = () => {
    navigate('/')
    sessionStorage.setItem("workspaceId", null)
    toast.success("Logged out of Workspace")
  }
  return (
    <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
                <h2>{workspacename} </h2>
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
                        <NavDropdown.Item  onClick={()=>{navigate('/workspace-settings')}}>
                           <SettingsIcon/> settings and Administration
                        </NavDropdown.Item>
                        <NavDropdown.Item >
                          <ExitToAppIcon style={{color:"red"}}/> Leave Workspace
                        </NavDropdown.Item>
                      </NavDropdown>
        
    <hr/>
   

   
    
    channels
      

    </SidebarContainer>
  )
}

export default WorkSpaceSideBar;

const SidebarContainer = styled.div`
    color:white;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);    
    flex:0.3;
    border-top:1px solid #49274b;
    max-width:260px;
    margin-top:45px;
    
   
    
    > NavDropdown{
      padding-left: 5px;
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


