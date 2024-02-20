import React from 'react'
import Navbar from './../components/user/navbar/Navbar'
import './BaseHomePageStyles.scss'
import WorkspaceListing from '../components/user/workspaceListing/WorkspaceListing'

const BaseHomePage = () => {
  const workspaces = [
    { id: 1, name: '"Lorem ipsum ', logo: 'workspace1-logo.png', description: 'Description of Workspace 1' },
    { id: 2, name: 'Workspace 2', logo: 'workspace2-logo.png', description: 'Description of Workspace 2' },
    // Add more workspace objects as needed
  ];
  return (
    <>
    <div className='Home'>

    <Navbar />
    <div className='HomeContainer'> 
   <h2>👋 Welcome Back </h2>
    <WorkspaceListing workspaces={workspaces} className="workspaceListing"/>
    </div>
    </div>
    
    </>
  )
}

export default BaseHomePage
