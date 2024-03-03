import React from 'react'
import WorkspaceAdminNav from '../../../components/user/workspaceAdmin/navbar/workspaceAdminNav'
import './workspaceAdminSetting.scss'

// input fields
import EditWorkspaceNameAndDescription from '../../../components/user/workspaceAdmin/RenameWorkspace/editWorkspaceNameAndDescription'

const WorkspaceAdminSettingsPage = () => {
  return (
    <div >
      <WorkspaceAdminNav/>
      <div className='contentContainer'>
      <div className='row'>
          <div className='col-md-6 col-sm-4 '>
            <EditWorkspaceNameAndDescription/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default WorkspaceAdminSettingsPage
