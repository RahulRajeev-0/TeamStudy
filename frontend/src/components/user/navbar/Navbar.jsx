import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './../../../assets/icon.png' 
import './NavbarStyles.css'
import {useDispatch} from "react-redux"
import { set_authentication } from '../../../Redux/Authentication/authenticationSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// boostrap react 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';



const Navbar = ({onCreateWorkspaceSuccess}) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL
  //  for creating the workspace
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // api function for creating the workspace 
  const createWorkspace = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    
    const formData = new FormData();
    formData.append("workspace_name", e.target.workspacename.value); // Access value property
    formData.append("description", e.target.description.value); // Access value property
    
    const headers = {
      'Authorization': `Bearer ${token}`, // Add space after 'Bearer'
      'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for FormData
    };
    
    try {
      const res = await axios.post(baseURL+'/workspace/create-workspace/', formData, { headers });
      
      if (res.status === 201) {
        toast.success("Workspace Created Successfully");
        onCreateWorkspaceSuccess();
       setShow(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  // function to handle cliceked
  const handleClick = ()=>{
    setClicked(!clicked);
  }

  
  const logout = ()=>{
    localStorage.clear();
    dispatch(
      set_authentication({
        username:null,
        isAuthenticated:false,
        isAdmin:false
      })
    );
    toast.warning("Logged out successfully ")
    navigate("/login")
  }
  return (
    <>
    <nav  className='NavbarItems'>
      <img  src={Icon} style={{paddingLeft:"8px"}} height={60} width={220} alt='Icon' ></img>

     
      <div onClick={handleClick} className='menu-icons'>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>


      <ul className={clicked ? "nav-menu active":"nav-menu"}>
       
        <li>
          <button onClick={handleShow} className='btn btn-light navButton btn-lg' href=''>Create Workspace </button>
        </li>
        <li>
          <button onClick={logout} className='btn btn-light navButton btn-lg' href="">Logout</button>
        </li>
      </ul>

    </nav>
    
    <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Create New Workspace</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={createWorkspace}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Workspace</Form.Label>
        <Form.Control
          type="text"
          placeholder="Workspace Name Here"
          autoFocus
          maxLength={50}
          name="workspacename"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Workspace Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={250}
          name="description"
          required
        />
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit"> {/* Add type="submit" */}
          Create Workspace
        </Button>
      </Modal.Footer>
    </Form>
  </Modal.Body>
</Modal>

    </>
   
  )
}

export default Navbar
