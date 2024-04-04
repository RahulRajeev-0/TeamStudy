import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddMemberToChannel from './AddMemberToChannelModal'
// icons
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

// axios
import axios from 'axios'

import {  useParams } from 'react-router-dom';

// react redux
import { useSelector, useDispatch } from 'react-redux';


// material ui table 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: 400,
    overflowY: 'auto', // Enable vertical scroll
    bgcolor: '#17141a',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
  };

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [members, setMembers] = useState([])
  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem('access');
  const dispatch = useDispatch();
  const {groupId} = useParams();
  const profile = useSelector(state => state.workspaceUserProfile);


//  ========================== member listing table ============================
const fetchMembers = async () => {
  try {
    const response = await axios.get(`${baseURL}/group/group-member-list/${groupId}/${profile.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log(response.data); // Check the structure of the response data
      setMembers(response.data); // Set the member data to the state
      
    }
  } catch (error) {
    console.error("Error fetching members:", error);
   
  }
};

  useEffect(()=>{
    fetchMembers();
  },[])
  
//  =========================================================================== 


  const handleKickOut = async (memberId) =>{
    try{
      const response = await axios.delete(
        `${baseURL}/group/group-member/${groupId}/${memberId}/${profile.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200){
        toast.success("Removed")
        fetchMembers();
      }

    }
  catch(error){
    console.log(error)
  }
}

  return (
    <div>
      <Button onClick={handleOpen}> <ManageAccountsOutlinedIcon/> Member</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Member Management 
          </Typography>
         
          <Typography id="modal-modal-description" sx={{ mt: 2 , color: 'white'}}>
          <AddMemberToChannel/>
          <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto', backgroundColor:"black"}}>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell style={{ color: 'white' }}>User Name</TableCell>
                  <TableCell style={{ color: 'white' }}>display Name</TableCell>
        <TableCell style={{ color: 'white' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell style={{ color: 'white' }}>{member.username}</TableCell>
                      <TableCell style={{ color: 'white' }}> ({member.display_name})</TableCell>
                      <TableCell>
                        {/* Add your action buttons here */}
                        <Button color='error' onClick={() => handleKickOut(member.id)}>
                          Kick Out
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          
          
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}