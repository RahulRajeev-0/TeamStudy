import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';
import "./UserListing.scss"
import DataTables from '../../../components/datatables/DataTables';

const UserListing = () => {
  return (
    <div className='list'>
      
        <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <DataTables className="datatable"/>
      </div>
    </div>
  )
}

export default UserListing
