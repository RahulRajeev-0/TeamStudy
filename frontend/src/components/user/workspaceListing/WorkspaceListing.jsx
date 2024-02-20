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
              <h3>{workspace.name}</h3>
              <p>{workspace.description}</p>
            </div>
            <button className='btn btn-outline-info '>Launch</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
