// WorkspaceList.jsx

import React from 'react';
import './WorkspaceListing.css';

const WorkspaceList = ({ workspaces }) => {
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
            <button className='btn btn-outline-info '>Launch</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
