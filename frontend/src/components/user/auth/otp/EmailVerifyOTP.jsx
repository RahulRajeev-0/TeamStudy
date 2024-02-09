import {useState} from 'react'
import './otpStyle.css';
import ThreeDBackground from '../../../vantaJS/ThreeDBackground';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EmailVerifiyOTP = () => {

    const [formError, setFormError] = useState([])
    const navigate = useNavigate();
    const baseURL = 'http://127.0.0.1:8000'
    const registrationEmail = sessionStorage.getItem('registrationEmail');  // data stored in session when uesr registered 



    // handling otp submission request 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('otp', e.target.optInput.value);
        formData.append('email', registrationEmail);

        try{
            const res = await axios.post(baseURL+'/user/verifyOTP/', formData)
            if (res.status === 200){
                navigate(
                    '/login',
                    {
                      state:res.data.Message
                    }
                    )
                    return res
            }
        }
        catch(error){
            if (error.response.status === 400){
                console.log("error")
            console.log(error.response.data)
            setFormError(error.response.data)
            toast.error(error.response.data.message);
            } else{
                console.log(error)
              }

        }
    }

  return (
    <ThreeDBackground>
       <div class="full-screen-div" style={{ border: 'none' , backgroundColor: 'transparent', boxShadow: 'none' }}>


    <form onSubmit={handleSubmit} className="form">
      <div className="title">OTP</div>
      <div className="title">Verification Code</div>
      <p className="message">We have sent a verification code to your Email </p>
      <p>{registrationEmail} </p>
      <div className="inputs">
        <input id="input1" type="text" name="optInput" maxLength="6" />
        
      </div>
      <button className='action' type="submit">verify me</button>
    </form>
    
        </div>
    </ThreeDBackground>
  )
}

export default EmailVerifiyOTP
