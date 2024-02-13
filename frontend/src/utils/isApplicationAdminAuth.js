import {jwtDecode} from "jwt-decode";
import axios from 'axios';



const baseURL = 'http://127.0.0.1:8000';


// function for updating the accesstoken 
const updateAdminToken = async () => {

    const refresh = localStorage.getItem('refresh')
    console.log("this is refresh token",refresh);

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
    console.log(accessToken)
    
    if (!accessToken){
        return {'username':null, isAuthenticated:false, isAdmin:false}
    }

    const currentTime = Date.now();
    console.log(currentTime);
    let decoded = jwtDecode(accessToken);
    console.log("ithu decoded =",decoded);
    console.log(decoded.exp, decoded.exp < currentTime, currentTime);
    // checking if the token is expired or not
    if (decoded.exp < currentTime){
        let checkAdmin = await fetchIsAdmin();
        console.log({
            "username": decoded.username,
            "isAuthenticated": true,
            "isAdmin":checkAdmin,
        });
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
           console.log(checkAdmin);
            
            return {
                "username": decoded.username,
                "isAuthenticated": true,
                "isAdmin":checkAdmin,
            };
        }else{
            console.log('yep before alst else');
            return { 'name': null, isAuthenticated: false, isAdmin: false };
        }
    }

}
export default isApplicationAdminAuth;