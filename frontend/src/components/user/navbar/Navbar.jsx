import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './../../../assets/icon.png' 
import './NavbarStyles.css'
import {useDispatch} from "react-redux"
import { set_authentication } from '../../../Redux/Authentication/authenticationSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';





const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // function to handle cliceked
  const handleClick = ()=>{
    setClicked(!clicked);
  }

  const notify = ()=>{
    toast.success('Create workspace')
      
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
      <img  src={Icon} style={{paddingLeft:"8px"}} height={80} width={240} alt='Icon' ></img>


      <div onClick={handleClick} className='menu-icons'>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>


      <ul className={clicked ? "nav-menu active":"nav-menu"}>
       
        <li>
          <button onClick={notify} className='btn btn-light navButton btn-lg' href=''>Create Workspace </button>
        </li>
        <li>
          <button onClick={logout} className='btn btn-light navButton btn-lg' href="">Logout</button>
        </li>
      </ul>

    </nav>
    

    </>
   
  )
}

export default Navbar
