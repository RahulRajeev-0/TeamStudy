import React from 'react'
import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LogoutIcon from '@mui/icons-material/Logout';
import Icon from './../../../assets/icon.png' 
import { useDispatch,} from 'react-redux';
import { useNavigate , Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { set_authentication } from '../../../Redux/Authentication/authenticationSlice';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutAdmin = ()=>{
        localStorage.clear();
    dispatch(
      set_authentication({
        username:null,
        isAuthenticated:false,
        isAdmin:false
      })
    );
    toast.warning("Logged out successfully ")
    navigate("/applicationManagement/login")
    }


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
                <Link  style={{textDecoration: 'none'}} to="/applicationManagement/user-listing">

                <SupervisedUserCircleIcon className='icon'/>
                <span>Users</span>
                </Link>
            </li>
            <li>
                <WorkspacesIcon className='icon'/>
                <span>Workspaces</span>
            </li>
            <li onClick={logoutAdmin}>
                <LogoutIcon className='icon'/>
                <span>Logout</span>
            </li>
        </ul>
        </div>
        
      
    </div>
  )
}

export default Sidebar
