import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profilePic from '../../../../assets/profilePic.jpeg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';


// redux store slice 
import { set_profile_pic } from '../../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_display_name } from '../../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_about_me } from '../../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';
import { set_phone_no } from '../../../../Redux/WorkspaceUserProfile/WorkspaceUserProfileSlice';


const UserProfileOffcanvas = ({ handleClose, show }) => {
  
  const dispatch = useDispatch();
  const token = localStorage.getItem('access')
  const workspaceId = sessionStorage.getItem('workspaceId')
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const userProfileDetails = useSelector(state => state.workspaceUserProfile);
  
  const [displayName, setDisplayName] = useState(userProfileDetails.displayName);
  const [phone, setPhone] = useState(userProfileDetails.phoneNo);
  const [about, setAbout] = useState(userProfileDetails.aboutMe);
  
  // profile pic
  const inputRef = useRef(null)
  
  const handleUploadImage = ()=>{
    if (inputRef.current){
        inputRef.current.click()
    }
  } 
  

  // for updating the profile pic
  const handleImageChange = async (e) =>{
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    let formData = new FormData();
    formData.append("profilePic", file,file.name);


    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
    if (file.size > maxSize) {
    toast.error("Please select an image file smaller than 2 MB.");
    return;
  }

    try{

      const response = await axios.patch(baseURL + `/workspace/user-profile-details/${workspaceId}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (response.status === 200){
        dispatch(set_profile_pic(response.data.data.profile_pic))
        
        toast.success("Profile Picture Updated Successfully ")
      }
     
    }catch(error){
      console.log(error);
    }




  }

//  for updating the profile details
  const handleSaveAll = async ()=> {

   
    const data = {
      displayName: displayName,
      phone: phone,
      about: about
    };
    
    try{

      const response = await axios.put(baseURL+`/workspace/user-profile-details/${workspaceId}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );

    if (response.status === 200){
      toast.success(response.data.message)
          dispatch(set_display_name(response.data.data.display_name))
          dispatch(set_about_me(response.data.data.about_me))
          dispatch(set_phone_no(response.data.data.phone_no))
        console.log(response.data.data);
    }
    }
    catch(error){
      console.log(error)
    }
    

    
  }


  console.log('=====================');
console.log(userProfileDetails.profilePic);
  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement='end' style={{backgroundColor:"#292829", color:'white'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2>Profile</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CenteredContainer>
            <ProfileImage src={userProfileDetails.profilePic ? baseURL + userProfileDetails.profilePic : profilePic} alt="Profile Picture" />
           <input type="file" ref={inputRef} accept="image/*" onChange={handleImageChange} style={{display:"none"}}/>
            <button className='btn btn-secondary'  onClick={handleUploadImage}>Upload Image</button>
              
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

const FileInput = styled.input`
  display: none;
`;

