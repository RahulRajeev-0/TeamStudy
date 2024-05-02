import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import Button from '@mui/material/Button'; 

import { toast } from 'react-toastify'


const MemberListing = () => {
  const [rows, setRows] = useState([])

  const workspaceId = sessionStorage.getItem('workspaceId');
  const token = localStorage.getItem('access');
  const baseURL = import.meta.env.VITE_API_BASE_URL
  // function to fetch list of members 
  const fetchData = async () => {
    
  
    try {
      const response = await axios.get(baseURL +'/workspace/member-list/', {
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

  // for making member admin 
  const handleMakeAdmin = async (id)=>{
    const data={
      memberId:id,
      workspaceId:workspaceId
    }
    try{
      const response = await axios.put(baseURL + '/workspace/member-list/',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200){
        toast.success(response.data.message)
      }
      
      
      ;
      fetchData()

    }catch(error){
      if (error.response && error.response.status === 403){
        toast(error.response.data.message)
      }
      console.log(error)
    }
  }

  const handleKickOut = async (id) => {
    const data = {
        memberId: id,
        workspaceId: workspaceId
    };

    try {
        const response = await axios.delete(baseURL+'/workspace/member-list/', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data // sending data in the request body
        });

        if (response.status === 200) {
            toast.success(response.data.message);
        }

        fetchData();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            toast(error.response.data.message);
        }
        console.log(error);
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
          onClick={() => handleMakeAdmin(params.row.id)} // Toggle admin status
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
