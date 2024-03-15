import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profilePic from '../../../../assets/profilePic.jpeg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useSelector} from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfileOffcanvas = ({ handleClose, show }) => {
  
  const token = localStorage.getItem('access')

  const userProfileDetails = useSelector(state => state.workspaceUserProfile);
  const [displayName, setDisplayName] = useState(userProfileDetails.displayName);
  const [phone, setPhone] = useState(userProfileDetails.phoneNo);
  const [about, setAbout] = useState(userProfileDetails.aboutMe);
  
  const handleSaveAll = async ()=> {

    const workspaceId = sessionStorage.getItem('workspaceId')
    const data = {
      displayName: displayName,
      phone: phone,
      about: about
    };
    
    try{

      const response = await axios.put(`http://127.0.0.1:8000/workspace/user-profile-details/${workspaceId}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );

    if (response.status === 200){
      toast.success(response.data.message)
    }
    }
    catch(error){
      console.log(error)
    }
    

    
  }

  

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement='end' style={{backgroundColor:"#131114", color:'white'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2>Profile</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CenteredContainer>
            <ProfileImage src={userProfileDetails.profilePic ? "http://localhost:8000/" + userProfileDetails.profilePic : profilePic} alt="Profile Picture" />
            <button className='btn btn-secondary'>Upload Image</button>
              
          </CenteredContainer>
          <UserInfoContainer>
           
            <UserInfoItems>

            <Form.Control  
            style={{ border: "none", background:"black" , color:'white' }}  
            type="text" 
            placeholder="display Name"  
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}/>
           
                
            </UserInfoItems>
          
            <UserInfoItems>

            <Form.Control 
            style={{ border: "none", background:"black" , color:'white' }} 
            type="number" 
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />

            </UserInfoItems>
           
            <UserInfoItems>
            
            <Form.Group 
            style={{ border: "none", background:"black" , color:'white' }} 
            className="mb-3"
             controlId="exampleForm.ControlTextarea1">
       
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={250}
          name="description"
          required
          placeholder='about'
          
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          style={{ border: "none", background:"transparent" , color:'white' }}
        
        />
        
        </Form.Group>
        
            </UserInfoItems>
            <Button onClick={handleSaveAll}>Save all</Button> 
          </UserInfoContainer>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default UserProfileOffcanvas;




const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 180px;
  height: 180px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 5px;
`;



const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color:white;
`;

const UserInfoItems = styled.div`
    display:flex;
    padding-top:10px;
`;


