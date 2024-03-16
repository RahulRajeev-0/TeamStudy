import React from 'react'
import './workspaceJoinRequest.css'
import { redirect, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';

const WorkspaceJoinRequest =  () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const JoinSubmit = async ()=>{
    const formData = new FormData();
    formData.append('token', token)

  //  try block to send request 
try{

  const response = await axios.post('http://127.0.0.1:8000/workspace/join-user/',formData)
  if (response.status === 200){
    toast.success("Joined to Workspace")
    navigate('/')
  }
}catch(error){
  if (error.response && error.response.status === 400){
    toast.warning(error.response.data.message)
  }
  console.log(error);
}

  }

  const reject = () =>{
    navigate('/')
  }
  return (
    <div className="JoinCard">
    <span className="JoinCard__title">Join Invitation</span>
    <p className="JoinCard__content">You have been invited to join to workspace</p>
    <div className="JoinCard__form">
        
        <button onClick={JoinSubmit} className="Join" style={{width:"200px", backgroundColor:"green"}}>Join</button>
        <button onClick={reject} className="Reject">Reject</button>
    </div>
</div>

  )
}

export default WorkspaceJoinRequest
