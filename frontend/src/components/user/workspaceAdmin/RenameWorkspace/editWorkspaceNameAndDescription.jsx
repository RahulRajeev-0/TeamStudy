import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditWorkspaceNameAndDescription() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('Workspace Name');

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [workspaceDescription, setWorkspaceDescription] = useState('Workspace Description');

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleSaveNameClick = () => {
    // Perform save operation for name here
    setIsEditingName(false);
  };

  const handleEditDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescriptionClick = () => {
    // Perform save operation for description here
    setIsEditingDescription(false);
  };

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
