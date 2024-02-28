import React , { useState, useEffect} from 'react'
import Navbar from './../components/user/navbar/Navbar'
import './BaseHomePageStyles.scss'
import WorkspaceListing from '../components/user/workspaceListing/WorkspaceListing'
import axios from 'axios'



const BaseHomePage = () => {

 

  const [workspaces, setWorkspaces] = useState([]);
  
  const fetchWorkspaces = async () => {
    const token = localStorage.getItem("access")
    try{
      const response = await axios.get('http://127.0.0.1:8000/workspace/user-workspace-list/',{
        headers: {
          Authorization:`Bearer ${token}`,
          Accept:'application/json',
          'Content-Type': 'application/json',

        },
      });
      setWorkspaces(response.data);
    }catch(error) {
      console.error("Error Fetching data:". error);
    }
  };

  useEffect(()=>{
    fetchWorkspaces()
  },[])
 

  
  return (
    <>
    <div className='Home'>

    <Navbar onCreateWorkspaceSuccess={fetchWorkspaces}/>
    <div className='HomeContainer'> 
   <h2>👋 Welcome Back </h2>
   
   
   {workspaces ? ( <WorkspaceListing workspaces={workspaces} className="workspaceListing" />): null}

    
    
    </div>
    
    </div>
    
    </>
  )
}

export default BaseHomePage
