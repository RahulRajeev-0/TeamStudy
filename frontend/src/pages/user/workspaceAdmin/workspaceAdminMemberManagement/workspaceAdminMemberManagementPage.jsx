import React from 'react'
import WorkspaceAdminNav from '../../../../components/user/workspaceAdmin/navbar/workspaceAdminNav'
import MemberListing from '../../../../components/user/workspaceAdmin/memberListing/memberListing'


const WorkspaceAdminMemberManagementPage = () => {
  return (
    <div>
      <WorkspaceAdminNav/>
      <h1>Member Management </h1>
      <div>
        <MemberListing/>
      </div>
    </div>
  )
}

export default WorkspaceAdminMemberManagementPage
