import React from 'react'
import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LogoutIcon from '@mui/icons-material/Logout';
import Icon from './../../../assets/icon.png' 

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <span className='logo'>
               {/* <img src={Icon} style={{paddingLeft:"1px"}} height={40} width={140} alt='Icon' ></img> */}
               TeamStudy            </span>
        </div>
        <hr />
        <div className="center">
        <ul>
           
            <li>
                <DashboardIcon className='icon'/>
                <span>Dashboard</span>
            </li>
            <li>
                <SupervisedUserCircleIcon className='icon'/>
                <span>Users</span>
            </li>
            <li>
                <WorkspacesIcon className='icon'/>
                <span>Workspaces</span>
            </li>
            <li>
                <LogoutIcon className='icon'/>
                <span>Logout</span>
            </li>
        </ul>
        </div>
        
      
    </div>
  )
}

export default Sidebar
