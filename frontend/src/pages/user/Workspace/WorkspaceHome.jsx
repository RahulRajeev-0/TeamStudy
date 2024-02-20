import React from 'react'
import WorkspaceHeader from '../../../components/user/WorkspaceHeader/WorkspaceHeader'
import WorkSpaceSideBar from "../../../components/user/WorkSpaceSideBar/WorkSpaceSideBar"
import styled from 'styled-components'



const WorkspaceHome = () => {
  return (
    <>
      <WorkspaceHeader/>
      <WorkspaceBody>
      <WorkSpaceSideBar/>

      </WorkspaceBody>

 
    </>
  )
}

export default WorkspaceHome;

const WorkspaceBody = styled.div`
  display:flex;
  height:100vh;
`
