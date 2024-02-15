export const userColumns = [
    
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 160 },
        { field: "email", headerName: "Email", width: 230 },
        { 
            field: "status",
            headerName: "Status", 
            width: 160,
            renderCell:(params)=>{
                return (
                    <div className={`cellWithStatus ${params.row.status}`}>
                        {params.row.status}
                    </div>
                )
            } 
        },

    
]

export const userRows = [
    { id: 1, username: 'Snow', email: 'rahulrajeev@gmail.com', status: 'active' },
    { id: 2, username: 'rajeev', email: 'rkahulrajeev@gmail.com', status: 'passive' },
   
]