export const userColumns = [
    
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 160 },
        { field: "email", headerName: "Email", width: 230 },
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

export const actionColumn = [{field:"action", headerName:"Action", with:200, renderCell:()=>{
    return (
      <div className='cellAction'>
          <div className='blockButton'>Block</div>
      </div>
    )
  }}]