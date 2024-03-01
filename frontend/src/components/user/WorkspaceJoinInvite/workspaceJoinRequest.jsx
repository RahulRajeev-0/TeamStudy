import React from 'react'
import './workspaceJoinRequest.css'

const WorkspaceJoinRequest = () => {
  return (
    <div className="JoinCard">
    <span className="JoinCard__title">Join Invitation</span>
    <p className="JoinCard__content">You have been invited to join to workspace</p>
    <div className="JoinCard__form">
        
        <button className="Join" style={{width:"200px", backgroundColor:"green"}}>Join</button>
        <button className="Reject">Reject</button>
    </div>
</div>

  )
}

export default WorkspaceJoinRequest
