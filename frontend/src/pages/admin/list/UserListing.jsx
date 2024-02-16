import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';
import "./UserListing.scss"
import DataTables from '../../../components/datatables/DataTables';
import { userColumns, actionColumn } from '../../../data/fatchUsers';

const UserListing = () => {
  return (
    <div className='list'>
      
        <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <DataTables 
        columns={userColumns}
        endpoint='http://127.0.0.1:8000/application_management/userListing/'
        additionalColumns={actionColumn}
        
        className="datatable"/>
      </div>
    </div>
  )
}

export default UserListing
