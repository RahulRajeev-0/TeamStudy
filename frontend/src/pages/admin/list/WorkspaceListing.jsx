import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';
import "./UserListing.scss"
import WorkspaceTable from './../../../components/datatables/WorkspaceTable'



const UserListing = () => {
  return (
    <div className='list'>
      
        <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <WorkspaceTable className="datatable"/>


      </div>
      
    </div>
  )
}

export default UserListing
