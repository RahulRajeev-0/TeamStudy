import React,{useReducer, useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import './Register.css'
import Icon from './../../../../assets/icon.png' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import ThreeDBackground from '../../../vantaJS/ThreeDBackground';
import axios from 'axios';
import { set_authentication } from '../../../../Redux/Authentication/authenticationSlice';
import {useDispatch} from 'react-redux';

import { jwtDecode } from "jwt-decode";
// alert toastify
import { toast } from 'react-toastify';

// google auth
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL


  //  validating the input data 
  const  validate = (e)=>{
    let username = e.target.username.value;
   let email = e.target.email.value
   let password = e.target.password.value
   let confirmpassword = e.target.confirmpassword.value
  
   if (username.length <= 3){
    toast.warning('Username should have atleast 4 character')
    return false;
   }

   if (username.includes(' ')){
    toast.warning("Username cannot contain blankspace")
    return false;
   }

   const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*[a-zA-Z][a-zA-Z\d]*$/;
   if (!regex.test(username)){
    toast.warning("Invalid Format")
    return false;
   }

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

   if (password !== confirmpassword){
    toast.warning('Passwords do not match')
    return false;
   }

   return true;
  }

  //  sending the data to the dackend 
  const handleSubmit = async (e)=>{
    e.preventDefault();
   
    
    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    

      if (validate(e)){

        try{
          const res = await axios.post(baseURL+'/user/register/',formData)
          if (res.status === 201){
            sessionStorage.setItem('registrationEmail', e.target.email.value);
            navigate(
              '/otp',
              {
                state:res.data.Message
              }
              )
              toast.success(res.data.Message)
              return res
          }
        }catch (error){
          if (error.response && error.response.data && error.response.data.message) {
            // Show error messages using Toastify
            error.response.data.message.forEach(errorMessage => {
              toast.error(errorMessage);
            });
          } else {
            // Show a generic error message if there are no specific error messages from the backend
            toast.error('An error occurred. Please try again later.');
          }
         
          if (error.response.status===406){
            console.log("error")
            console.log(error.response.data)
           
            toast.error(error.response.data.message);

          } else{
            console.log(error)
          }
        }
      
      }    
    
    
  }

// user google sign in function 
  const google_submit = async(user_details) => {
    const formData = {
      client_id: user_details,
    } 

    try{
      const res = await axios.post(baseURL+'/user/user-google/register/',formData )
      if (res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        console.log(res.data)

        // add data to the redux store here 
        dispatch(
          set_authentication({
            username:jwtDecode(res.data.access).username,
            isAuthenticated:true,
            isAdmin:res.data.is_admin
          })
        )
        navigate(
          '/',
          {state:res.data.Message}
        )
        toast.success("Login Success")
      }
      }catch(error){
        console.log(error)
      }
    
      
    }
  return (
    
 <ThreeDBackground>

    <section className="vh-75 " style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black " style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }} >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color:'violet'}}>Sign Up</p>
                    <p className='text-center'>We suggest using the email address that you use for work </p>
                    

                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example1c">Username</label>
                          <input type="text" id="form3Example1c" className="form-control" name="username" required/>

                        </div>
                      </div>


                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          <input type="email" id="form3Example3c" className="form-control" name="email" required/>

                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faLock} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                          <input type="password" id="form3Example4c" className="form-control" name="password" required/>

                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faKey} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          <input type="password" id="form3Example4cd" className="form-control" name="confirmpassword" required />

                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                      <div>
                <Link to='/login'>Have an account ? Login </Link>
                  
                </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button  type="submit" className="btn btn-primary btn-lg me-3">Register</button>
                           
                        </div>
                        <GoogleLogin
                                onSuccess={credentialResponse => {
                                  var user_details = credentialResponse.credential
                                  google_submit(user_details)
                                 
                                }}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />

                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={Icon}
                      className="img-fluid"
                      alt="Sample image"
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
  </ThreeDBackground>
  )
}

export default Register
