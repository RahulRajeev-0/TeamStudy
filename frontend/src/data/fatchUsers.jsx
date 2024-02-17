import axios from "axios";
import 
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
export const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const handleBlockUnblock = async () => {
        try {
          const token = localStorage.getItem("access");
          await axios.put(
            `http://127.0.0.1:8000/application_management/user-block/${params.row.id}/`,
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
          // Assuming `refreshData` is a function passed as a prop to DataTables
          // that refreshes the data
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