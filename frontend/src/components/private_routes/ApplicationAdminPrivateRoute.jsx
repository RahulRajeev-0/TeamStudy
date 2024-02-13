import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import isApplicationAdminAuth from '../../utils/isApplicationAdminAuth'
import Loader from '../loader/Loader'

const ApplicationAdminPrivateRoute = ({children}) => {
    
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState({
        "is_authenticated":false,
        "is_admin":false
    })

    useEffect(()=>{
     const fatchData = async()=>{
      const authInfo = await isApplicationAdminAuth();
        
      
     
     setIsAuthenticated({
        "is_authenticated":authInfo.isAuthenticated,
        "is_admin":authInfo.isAdmin,
     });
     setTimeout(() => { setLoading(false); }, 2000);
     }
     fatchData();   
    },[]);

    if (loading){
        return <div><Loader/></div>
    }

    if(!isAuthenticated.is_authenticated || !isAuthenticated.is_admin){
        
        return <Navigate to="/applicationManagement/Login" />
    }

    return children;


}

export default ApplicationAdminPrivateRoute
