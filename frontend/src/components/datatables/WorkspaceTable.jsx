import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './DataTables.scss';


const DataTables = () => {
  const [data, setData] = useState([]);

   const userColumns = [
    
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'workspace_name', headerName: 'Name', width: 160 },
    { field: 'created_by', headerName: 'Owner', width: 230, renderCell: (params) => params.value.username },
    { field: "is_premium", headerName: "Premium", width: 230 },
    // {field: "is_active", headerName: "Is active", width: 200}
    {
      field: "is_active",
      headerName: "Is Active",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.value ? 'active' : 'inactive'}`}>
            {params.value ? 'Active' : 'Inactive'}
          </div>
        );
      }
    }
    
      


]

 const fetchData = async () => {
  const token = localStorage.getItem('access');
  try {
    const response = await axios.get('http://127.0.0.1:8000/application_management/workspace-listing/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data)
    setData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      const handleBlockUnblock = async () => {
        try {
          const token = localStorage.getItem("access");
          await axios.put(
            `http://127.0.0.1:8000/application_management/workspace-block/${params.row.id}/`,
            {
              is_active: !params.row.is_active,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          
          fetchData();
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      };

      return (
        <div className="cellAction">
          <div onClick={handleBlockUnblock} className="blockButton">
            {params.row.is_active ? "Block" : "Unblock"}
          </div>
        </div>
      );
    },
  },
];
  useEffect(()=>{
    fetchData()
  },[])

  const allColumns = [...userColumns, ...actionColumn];
  return (
    <div className='datatable'>
      <DataGrid
        rows={data}
        columns={allColumns}
        pageSize={5}
        pagination
        checkboxSelection
      />
    </div>
  );
};

export default DataTables;
