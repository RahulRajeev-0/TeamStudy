import React from 'react'
import "./ApplicationManagementHome.scss"
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';
import Widget from '../../../components/admin/widget/Widget';

const ApplicationManagementHome = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className='homeContainer'>
        <Navbar/>
        {/* <div className='widgets'>
          <Widget/>
          <Widget/>
          <Widget/>
          <Widget/>
        </div> */}
      </div>
    </div>
  )
}

export default ApplicationManagementHome;
