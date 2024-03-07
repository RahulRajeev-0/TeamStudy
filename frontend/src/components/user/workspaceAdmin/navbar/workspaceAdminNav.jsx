import React, {useEffect, useState} from 'react'
import "./workspaceAdminNav.scss"

// react router dom
import { useNavigate , Link, resolvePath} from 'react-router-dom';
// material ui icons
import HomeIcon from '@mui/icons-material/Home';

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


const WorkspaceAdminNav = () => {
  const navigate = useNavigate()
  const workspaceId = sessionStorage.getItem('workspaceId')
  const [workspace, setWorkspace] = useState({"workspace_name":'workspaceName'})
  
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('access')
  const baseURL = 'http://127.0.0.1:8000'

  const fetchWorkspaceDetails = async()=>{
    
    const response = await axios.get(baseURL+`/workspace/user-workspace-details/${workspaceId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    
    if (response.status === 200){
      console.log(response.data);
      setWorkspace(response.data)
      
    }else{
      console.log(response)
      return {}
    }
  }

  useEffect(()=>{fetchWorkspaceDetails()},[])

  return (
    <>
    {['xxl'].map((expand) => (
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          
          <Navbar.Brand >
       <HomeIcon/>           {workspace.workspace_name}
            </Navbar.Brand>
          
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              {workspace.workspace_name}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={()=>navigate('/workspace-settings')}>Home</Nav.Link>
                <Nav.Link onClick={()=>navigate('/workspace-settings-members')}>Manage Memebers</Nav.Link>
                <Nav.Link onClick={handleShow} style={{color:'red'}}>Delete Workspace</Nav.Link>
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
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {workspace.workspace_name} Woorkspace ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure you want to delete {workspace.workspace_name}  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default WorkspaceAdminNav
