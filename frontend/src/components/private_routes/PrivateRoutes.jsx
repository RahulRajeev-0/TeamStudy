import React, {useEffect, useState} from 'react'
import isAuthUser from '../../utils/isAuth';
import {Navigate} from 'react-router'
import Loader from '../loader/Loader';
const PrivateRoutes = ({children}) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // jwt authentication checking , whether the user have access or user is loged in or not 
  useEffect(()=>{
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      setIsAuthenticated(authInfo.isAuthenticated);
      setTimeout(() => { setLoading(false); }, 2000);

    };
      fetchData();
  },[])

  if (isLoading){
    return <div> <Loader/> </div>;
  }
  if (!isAuthenticated){
    return <Navigate to="/login" />
  }

  return children;
 
}

export default PrivateRoutes
