import React, {useState} from 'react'
import "./AdminLoginStyles.css"
import Icon from "./../../../../assets/icon.png"
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"
import {set_authentication} from "./../../../../Redux/Authentication/authenticationSlice"
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import axios from "axios"



const AdminLogin = () => {

  const baseURL = 'http://127.0.0.1:8000'
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // validating the user input data
    const validate = (e) =>{
        let email = e.target.email.value;
        let password = e.target.password.value;
    
        if (!email.includes('@') || !email.includes('.com') || email.includes(' ')){
          toast.warning('Invalid Email Format')
          return false;
         }
      
         if (password.includes(' ')){
          toast.warning('Password should not include blank space')
          return false;
         }
         if (password.length < 8 ){
          toast.warning('Password Should Contain Atleast 8 Characters')
          return false;
         }
         return true
    
      }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (validate(e)){
            const formData = new FormData();
            formData.append("email", e.target.email.value);
            formData.append("password", e.target.password.value)
            try{
              const res = await axios.post(baseURL+"/user/login/", formData)
              if (res.status === 200){
                localStorage.setItem('access', res.data.access)
                localStorage.setItem('refresh', res.data.refresh)
                console.log(res.data)

                // add data to the store 
                dispatch(
                  set_authentication({
                    username:jwtDecode(res.data.access).username,
                    isAuthenticated:true,
                    isAdmin:res.data.is_admin
                  })
                )
                
                navigate("/adminLoginHome")
                toast.success("login success")
              }
            }catch(error){
              
              if (error.response.status && error.response.status === 401){
                console.log(error.response.data)
                toast.error(error.response.data.detail);
              }else{
                console.log(error);
              }
            }

        }

        }
    
  return (
        <section>
        <div className="container  py-5">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-8 col-lg-7 col-xl-6">
            
            
      
              <img src={Icon}
                className="img-fluid"/>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <h3>Admin Login</h3>
                {/* <!-- Email input --> */}
                <div className=" mb-4">
                  <input type="email" name='email' id="form1Example13" className="form-control form-control-lg" required />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>
      
                {/* <!-- Password input --> */}
                <div className=" mb-4">
                  <input type="password" name='password' id="form1Example23" className="form-control form-control-lg" required/>
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>
      
              
      
                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
      
              
                
              </form>
            </div>
          </div>
        </div>
      </section>
      )
}

export default AdminLogin
