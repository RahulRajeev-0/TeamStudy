import React from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import Icon from './../../../../assets/icon.png'

import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { set_authentication } from "../../../../Redux/Authentication/authenticationSlice"; 

import { jwtDecode } from "jwt-decode";
// alert
import { toast } from 'react-toastify';




const Login = () => {

  const baseURL = 'http://127.0.0.1:8000'
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate(e)){
     const formData = new FormData();
     formData.append('email', e.target.email.value);
     formData.append('password', e.target.password.value);
    
      try{
        const res = await axios.post(baseURL+'/user/login/', formData)
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

        if (error.response.status && error.response.status === 401){
          console.log("error")
          console.log(error.response.data)
          toast.error(error.response.data.detail);
        }
        else{
          console.log(error)
        }
      }

    }

  }

  return (
    <>
 

      <section className="vh-100" style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black " style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }} >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 bg-white" style={{color:'violet'}}>Log In</p>
                    <p className='text-center bg-white'>We suggest using the email address that you use for work </p>
                    
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" name='email' required/>
                          <label className="form-label fw-bold bg-white" htmlFor="form3Example3c">Email</label>
                        </div>
                      </div>

                      
                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faKey} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" name='password' required/>
                          <label className="form-label fw-bold bg-white" htmlFor="form3Example4cd">Password</label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                      <div>
                <Link to='/signUp'>Don't have an account ?</Link>
                  
                </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg me-3">Log In</button>
                            <button type="button" className="btn btn-lg ms-3 btn-dark">Google</button>
                        </div>

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
      
      
   
 

    </>
  )
}

export default Login
