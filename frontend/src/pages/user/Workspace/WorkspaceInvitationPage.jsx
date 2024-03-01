import React from 'react'
import WorkspaceJoinRequest from '../../../components/user/WorkspaceJoinInvite/workspaceJoinRequest'
import styled from 'styled-components'
import ThreeDBackground from '../../../components/vantaJS/ThreeDBackground'

const WorkspaceInvitationPage = () => {
  return (
    <>
    <ThreeDBackground>

    <Body>

      <WorkspaceJoinRequest />
    </Body>
    </ThreeDBackground>
    </>
   
  )
}

export default WorkspaceInvitationPage
const Body = styled.div`
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
width:100%;
background:transparent;
`;
