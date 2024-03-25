import React, {useEffect, useState} from 'react'
import "./workspaceAdminNav.scss"

// react router dom
import { useNavigate , Link, resolvePath} from 'react-router-dom';

// material ui icons
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';


// axios 
import axios from 'axios';

// bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Modal from 'react-bootstrap/Modal';

//  redux and redux store 
import { useSelector } from 'react-redux'

// toastify
import { toast } from 'react-toastify';



const WorkspaceAdminNav = () => {
  const navigate = useNavigate()
  const workspaceId = sessionStorage.getItem('workspaceId')
  
  const workspaceDetails = useSelector(state => state.user_workspace_select);
  // modal
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  
  const addHandleClose = () => setAddShow(false);
  const AddHandleShow = () => setAddShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('access')
  const baseURL = 'http://127.0.0.1:8000'


  
  // for adding new members to workspace
  const addMember = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem('access')
    const formData = new FormData();
    formData.append('workspaceId',workspaceId)
    formData.append('newMember',e.target.Memmber.value)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
    };
    try{

      const response = await axios.post(baseURL+'/workspace/invite-user/',formData,{headers});
      if (response.status === 200){
        toast.success("request send successfully")
        setAddShow(false)
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

  // deleting the workspace 
  const deleteWorkspace = async () => {
    const formData = new FormData();
     formData.append("workspaceId", workspaceId)

    try{

      const response = await axios.delete(baseURL+'/workspace/delete-workspace/',{
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: formData // sending data in the request body
    });
      if (response.status === 200){
        
        navigate('/')
        sessionStorage.setItem('workspaceId',null)
        console.log(response)
        toast.success(response.data.message)
      }

      
    }
    catch(error){
      toast.warning(error.response.data.message)
    }
    
  }

  

  return (
    <>
    {['xxl'].map((expand) => (
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          
          <Navbar.Brand >
       <HomeIcon/>           {workspaceDetails.workspaceName}
            </Navbar.Brand>
          
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              {workspaceDetails.workspaceName}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={()=>navigate('/workspace-settings')}><HomeIcon/> Home</Nav.Link>
                <Nav.Link onClick={()=>navigate('/workspace-settings-members')}><ManageAccountsIcon/> Manage Memebers</Nav.Link>
                <Nav.Link style={{color:'green'}} onClick={AddHandleShow}><PersonAddIcon/> Add Member</Nav.Link>
                <Nav.Link onClick={handleShow} style={{color:'red'}}><DeleteIcon/> Delete Workspace</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>

        
      </Navbar>

      
    ))}
    {/* modal for confirming deleting a workspace */}
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {workspaceDetails.workspaceName} Woorkspace ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure you want to delete {workspaceDetails.workspaceName}  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteWorkspace}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for add new member */}

      <Modal show={addShow} onHide={addHandleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add member to workspace </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={addMember}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email Of New Member</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please enter the email of the user"
          autoFocus
          maxLength={50}
          name="Memmber"
          required
        />
      
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={addHandleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit"> {/* Add type="submit" */}
          Send Invitation
        </Button>
      </Modal.Footer>
    </Form>
  </Modal.Body>
</Modal>

      
  </>
  )
}

export default WorkspaceAdminNav
