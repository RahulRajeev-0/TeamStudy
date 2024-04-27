import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import HomeIcon from '@mui/icons-material/Home';

// redux
import { useDispatch, useSelector } from "react-redux";

const WorkspaceInfo = ({ workspace }) => {
    const workspaceDetails = useSelector(state => state.user_workspace_select);

    const dateObject = new Date(workspaceDetails.create_on);
    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
  return (
    <Card className="text-center" style={{backgroundColor:"#4b527b"}} text='secondary'>
      <Card.Header className='text-light'>Info  </Card.Header>
      <Card.Body>
        <Card.Title style={{color:"white"}}><HomeIcon/> {workspaceDetails.workspaceName}</Card.Title>
        <Card.Text style={{color:"black"}}>
          Hello , Welcome to {workspaceDetails.workspaceName} workspace,
          this workspace is created by {workspaceDetails.created_by.email} on {formattedDate}
          
        </Card.Text>
        <Card.Text style={{color:"black"}}>
          <span style={{color:"white"}}>workspace Description: </span>{workspaceDetails.workspaceDescription}
        </Card.Text>
       
      </Card.Body>
      <Card.Footer className="text-muted">----</Card.Footer>
    </Card>
  
  );
}

export default WorkspaceInfo;

// // Styled components
// const InfoContainer = styled.div`
//   background-color: black;
//   color: #CECECE;
//   padding: 20px;
//   border-radius: 10px;
// `;

// const InfoHeader = styled.h2`
//   font-size: 20px;
//   margin-bottom: 15px;
// `;

// const InfoContent = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const InfoItem = styled.div`
//   display: flex;
//   margin-bottom: 10px;
// `;

// const InfoLabel = styled.span`
//   font-weight: bold;
//   margin-right: 10px;
// `;

// const InfoValue = styled.span`
//   flex: 1;
// `;
