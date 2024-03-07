import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// axios
import axios from 'axios';

import { toast } from 'react-toastify';

function EditWorkspaceNameAndDescription() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('Workspace Name');

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [workspaceDescription, setWorkspaceDescription] = useState('Workspace Description');

  const baseURL = 'http://127.0.0.1:8000'
  const workspaceId = sessionStorage.getItem('workspaceId')
  const token = localStorage.getItem('access')

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleSaveNameClick = async () => {
    const formData = new FormData()
    formData.append("workspaceId", workspaceId)
    formData.append("newName",workspaceName)

    try{

      const response = await axios.put(baseURL+"/workspace/change-workspace-name/",
      formData,
      {
        headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            'Content-Type': 'multipart/form-data' // Set the Content-Type header for FormData
        }
    })
    if (response.status === 200){
      toast.success(response.data.message)
     
    }
    }catch(error){
      console.log(error)
      toast.warning(error.response.data.message)
    }
    setIsEditingName(false);
  };


  const handleEditDescriptionClick =  () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescriptionClick = async () => {
    const formData = new FormData()
    formData.append("workspaceId", workspaceId)
    formData.append("newDescription",workspaceDescription)

    try{

      const response = await axios.put(baseURL+"/workspace/change-workspace-description/",
      formData,
      {
        headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            'Content-Type': 'multipart/form-data' // Set the Content-Type header for FormData
        }
    })
    if (response.status === 200){
      toast.success(response.data.message)
     
    }
    }catch(error){
      console.log(error)
      toast.warning(error.response.data.message)
    }
    setIsEditingDescription(false);
  };


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
      setWorkspaceName(response.data.workspace_name)
      setWorkspaceDescription(response.data.description)
      
    }else{
      return {}
    }
  }

  useEffect(  () => {
      fetchWorkspaceDetails();
    
  }, []);




  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Workspace Name</Form.Label>
        <div className="d-flex align-items-center">
          {isEditingName ? (
            <Form.Control
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          ) : (
            <Form.Control
              type="text"
              value={workspaceName}
              disabled
            />
          )}
          <Button className='btn' onClick={isEditingName ? handleSaveNameClick : handleEditNameClick}>
            {isEditingName ? 'Save' : 'Edit'}
          </Button>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Workspace Description</Form.Label>
        <div className="d-flex align-items-center">
          {isEditingDescription ? (
            <Form.Control
              as="textarea"
              rows={3}
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
            />
          ) : (
            <Form.Control
              as="textarea"
              rows={3}
              value={workspaceDescription}
              disabled
            />
          )}
          <Button className='btn' onClick={isEditingDescription ? handleSaveDescriptionClick : handleEditDescriptionClick}>
            {isEditingDescription ? 'Save' : 'Edit'}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}

export default EditWorkspaceNameAndDescription;
