import React from 'react'
import './workspaceJoinRequest.css'

const WorkspaceJoinRequest = () => {
  return (
    <div className="card">
    <span className="card__title">Join Invitation</span>
    <p className="card__content">You have been invited to join to workspace</p>
    <div className="card__form">
        
        <button className="sign-up" style={{width:"200px", backgroundColor:"green"}}>Join</button>
        <button className="sign-up">Reject</button>
    </div>
</div>

  )
}

export default WorkspaceJoinRequest
