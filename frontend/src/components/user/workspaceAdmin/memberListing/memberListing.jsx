import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import Button from '@mui/material/Button'; 




const MemberListing = () => {
  const [rows, setRows] = useState([])

  // function to fetch list of members 
  const fetchData = async () => {
    const token = localStorage.getItem('access');
    const workspaceId = sessionStorage.getItem('workspaceId');
    
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/workspace/member-list/', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: {
          workspaceId: workspaceId,
        }
      });
      setRows(response.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(()=>{
    fetchData()
  },[])  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'display_name', headerName: 'Display name', width: 130 },
    { field: 'is_admin', headerName: 'Is admin', width: 130 },
    { field: 'user', headerName: 'Email', width: 330, renderCell: (params) => params.value.email },
    {
      field: 'makeAdmin',
      headerName: 'Make Admin',
      width: 250,
      renderCell: (params) => (
        <Button
          variant="outline"
          color={params.row.is_admin ? "primary" : "success"} // Use secondary color if user is admin
          onClick={() => handleMakeAdmin(params.row.id, !params.row.is_admin)} // Toggle admin status
        >
          {params.row.is_admin ? "Remove Admin" : "Make Admin"}
        </Button>
      ),
    },
    {
      field: 'kickOut',
      headerName: 'Kick Out',
      width: 250,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleKickOut(params.row.id)}
        >
          Kick Out
        </Button>
      ),
    },
  ];
  



      
      

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </div>
  )
}

export default MemberListing
