import React from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import Icon from './../../../../assets/icon.png'
import ThreeDBackground from '../../../vantaJS/ThreeDBackground';

// alert
import { toast } from 'react-toastify';




const Login = () => {
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
     if (password.length <= 8 ){
      toast.warning('Password Should Contain Atleast 8 Characters')
      return false;
     }

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate(e)){
      toast.success('login success')
    }

  }

  return (
    <>
    <ThreeDBackground>

      <section className="vh-100 style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }}">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black " style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }} >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color:'violet'}}>Log In</p>
                    <p className='text-center '>We suggest using the email address that you use for work </p>
                    
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" name='email' required/>
                          <label className="form-label" htmlFor="form3Example3c">Email</label>
                        </div>
                      </div>

                      
                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faKey} className="fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" name='password' required/>
                          <label className="form-label" htmlFor="form3Example4cd">Password</label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
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
      
      
   
  </ThreeDBackground>

    </>
  )
}

export default Login
