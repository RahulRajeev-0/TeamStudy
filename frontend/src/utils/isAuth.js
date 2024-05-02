import {jwtDecode} from 'jwt-decode';
import axios from 'axios'

// user update token 

const updateUserToken = async () =>{
    const refreshToken = localStorage.getItem('refresh');
    const baseURL = import.meta.env.VITE_API_BASE_URL

    try {
        const res = await axios.post(baseURL+'/user/token/refresh/',
        {
            "refresh":refreshToken
        })
        if (res.status === 200){
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            let decoded = jwtDecode(res.data.access);
            return {
                'username':decoded.username,
                'id':decoded.user_id,
                isAuthenticated:true
            }

        }else{
            return{
                'username':null,
                'id':null,
                isAuthenticated:false
            }
        }
    }
    catch(error){
        return {"username":null, 'id':null, isAuthenticated:false}
    }
}


const isAuthUser = async ()=> {
    const accessToken = localStorage.getItem("access")

    if (!accessToken){
        return {'username':null, 'id':null, isAuthenticated:false}

    }
    const currentTime = Date.now()/1000;
    
    let decoded = jwtDecode(accessToken)
    
    if (decoded.exp > currentTime){
        return {'id':decoded.user_id, 'username':decoded.username, isAuthenticated:true}

    } else{
        const updateSuccess = await updateUserToken();
        return updateSuccess;
    }
}

export default isAuthUser;