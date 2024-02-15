import React from 'react'

import { DataGrid } from '@mui/x-data-grid';

import {userColumns, userRows} from "./../../data/fatchUsers" 
import "./DataTables.scss"




const DataTables = () => {
  const actionColumn = [{field:"action", headerName:"Action", with:200, renderCell:()=>{
    return (
      <div className='cellAction'>
          <div className='blockButton'>Block</div>
      </div>
    )
  }}]
  return (
    <div className='datatable'>
       <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionColumn)}   
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTables
