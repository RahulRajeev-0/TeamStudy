// WorkspaceList.jsx

import React from 'react';
import './WorkspaceListing.css';

// redux 
import { useDispatch } from 'react-redux';
import { set_selected_workspace } from '../../../Redux/WorkspaceBaseDetails/workspaceBaseDetailsSlice';
import { useSelector } from 'react-redux';
//  router 
import { useNavigate } from 'react-router-dom';




const WorkspaceList = ({ workspaces }) => {
  const navigate = useNavigate();

  const launchWorkspace = (workspace)=>{
    sessionStorage.setItem('workspaceId', workspace.id);
    navigate('/workspace')

  }

  
 
  return (
    <div className='workspace-list'>
      <h2>Your Workspaces</h2>
      <ul className='workspace-items'>
        {workspaces.map(workspace => (
          <li key={workspace.id} className='workspace-item'>
            {/* <img src={workspace.logo} alt={`Logo for ${workspace.name}`} /> */}
            <div className='workspace-details'>
            <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '170px' }}>{workspace.workspace_name}</h3>


              <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px' }}>{workspace.description}</p>
            </div>
            <button className='btn btn-outline-info ' onClick={()=>launchWorkspace(workspace)}>Launch</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
