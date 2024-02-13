import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import isApplicationAdminAuth from '../../utils/isApplicationAdminAuth'

const ApplicationAdminPrivateRoute = ({children}) => {
    
    const [isloading, setIsloading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState({
        "is_authenticated":false,
        "is_admin":false
    })

    useEffect(()=>{
     const fatchData = async()=>{
      const authInfo = await isApplicationAdminAuth();

      
      console.log("ithinte mukalil onle workavanilla",authInfo.isAdmin);
     setIsAuthenticated({
        "is_authenticated":authInfo.isAuthenticated,
        "is_admin":authInfo.isAdmin,
     });
     setIsloading(false);
     }
     fatchData();   
    },[]);

    if (isloading){
        return <div>Loading ...........</div>
    }

    if(!isAuthenticated.is_authenticated || !isAuthenticated.is_admin){
        
        return <Navigate to="/applicationManagement/Login" />
    }

    return children;


}

export default ApplicationAdminPrivateRoute
