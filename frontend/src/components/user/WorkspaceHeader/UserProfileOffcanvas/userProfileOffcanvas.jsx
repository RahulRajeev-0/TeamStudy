import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profilePic from '../../../../assets/profilePic.jpeg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const UserProfileOffcanvas = ({ handleClose, show }) => {
  

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement='end' style={{backgroundColor:"#1D1B1B", color:'white'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2>Profile</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CenteredContainer>
            <ProfileImage src={profilePic} alt="Profile Picture" />
            <EditButton >
              <EditIcon />
            </EditButton>
              
          </CenteredContainer>
          <UserInfoContainer>
            <p>display name</p>
            <UserInfoItems>

            <Form.Control  style={{ border: "none", background:"transparent" , color:'white' }}  type="text" placeholder="Display Name"  />
                
            </UserInfoItems>
            <p>email</p>
            <UserInfoItems>

            <Form.Control style={{ border: "none", background:"transparent" , color:'white' }} type="text" placeholder="Email" readOnly />
            </UserInfoItems>
            <p>phone</p>
            <UserInfoItems>

            <Form.Control style={{ border: "none", background:"transparent" , color:'white' }} type="text" placeholder="Phone" readOnly />
            </UserInfoItems>
            <p>about</p>
            <UserInfoItems>

            <Form.Group style={{ border: "none", background:"transparent" , color:'white' }} className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Workspace Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={250}
          name="description"
          required
          readOnly

          style={{ border: "none", background:"transparent" , color:'white' }}
        /> </Form.Group>
            </UserInfoItems>
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
`;


