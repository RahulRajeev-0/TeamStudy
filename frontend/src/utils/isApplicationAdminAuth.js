import {jwtDecode} from "jwt-decode";
import axios from 'axios';



const baseURL = 'http://127.0.0.1:8000';


// function for updating the accesstoken 
const updateAdminToken = async () => {

    const refresh = localStorage.getItem('refresh')
    
    try{
        const res = await axios.post(baseURL+"/user/token/refresh/",
        {
            "refresh":refresh
        });
        if (res.status === 200){
            localStorage.setItem('access',res.data.access)
            localStorage.setItem('refresh',res.data.refresh)
            return true
            
        }else{
            return false
        }

    }catch(error){
        return false;
    }
}

// function for getting the user detail , here for is super user true
const fetchIsAdmin = async ()=>{
    const token = localStorage.getItem("access")
    try{
        const res = await axios.get(baseURL+'/user/userDetails/',{
            headers: {
                'Authorization':`Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });


        
        return res.data.is_superuser;
    }catch(error){
        console.log(error)
        return false;
    }
};


// function for checking the is super user and returning the details 
const isApplicationAdminAuth = async () => {

    const accessToken = localStorage.getItem('access');
    
    if (!accessToken){
        return {'username':null, isAuthenticated:false, isAdmin:false}
    }

    const currentTime = Date.now();
    
    let decoded = jwtDecode(accessToken);
   
    // checking if the token is expired or not
    if (decoded.exp < currentTime){
        let checkAdmin = await fetchIsAdmin();
        return {
            "username": decoded.username,
            "isAuthenticated": true,
            "isAdmin":checkAdmin,
        };
    }else{
        
        const updateSuccess = await updateAdminToken();
        
        if (updateSuccess){
            
            let decoded = localStorage.getItem('access')
            
            let checkAdmin = await fetchIsAdmin();
          
            
            return {
                "username": decoded.username,
                "isAuthenticated": true,
                "isAdmin":checkAdmin,
            };
        }else{
           
            return { 'name': null, isAuthenticated: false, isAdmin: false };
        }
    }

}
export default isApplicationAdminAuth;