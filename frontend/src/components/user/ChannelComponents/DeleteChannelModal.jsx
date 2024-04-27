import React , {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#17141a',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const baseURL = "http://127.0.0.1:8000"
  const profile = useSelector(state => state.workspaceUserProfile);
 const navigate = useNavigate()
    const token = localStorage.getItem('access')
 const {groupId} = useParams();

  const handleDelete = async ()=> {
    try{
        const response = await axios.delete(baseURL+`/group/workspace-group/${groupId}/${profile.id}/`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.status === 200){
            toast.success("Channel Deleted ")
            navigate('/workspace')
          }
    }catch(error){
        console.log(error);
    }

  }

  return (
    <div>
        <Button onClick={handleOpen}><DeleteIcon/> Delete</Button>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{color:'white'}}>
              Are you sure ?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 , color:'white'}}>
              Do you want to delete the Channel ?
            </Typography>
            <Button onClick={handleDelete} color='error' size="small">
          Delete 
        </Button>
            <Button variant="outlined" color='success' size="small" onClick={handleClose}>
          No 
        </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}