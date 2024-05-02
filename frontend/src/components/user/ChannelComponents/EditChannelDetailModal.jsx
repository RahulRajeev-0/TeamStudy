import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toast } from 'react-toastify';

// modal


import {  useParams } from 'react-router-dom';

import { set_selected_group } from '../../../Redux/WorkspaceGroup/GroupSlice';

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL
  const token = localStorage.getItem('access');
  const dispatch = useDispatch();
  const {groupId} = useParams();
  
  const profile = useSelector(state => state.workspaceUserProfile);

  const [channelData, setChannelData] = useState({
    name: "",
    description: "" ,
      topic: "" ,
      is_private: false,
  });

  const fetchGroupInfo = async () => {
    try{
        const response = await axios.get(baseURL + `/group/workspace-group/${groupId}/${profile.id}/`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
       
        setChannelData(response.data)
        dispatch(set_selected_group(response.data))
    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
  fetchGroupInfo();
},[])

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setChannelData(prevState => ({
      ...prevState,
      [name]: name === 'isPrivate' ? checked : value
    }));
  };

  const updateGroupInfo = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/group/workspace-group/${groupId}/${profile.id}/`,
        channelData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Updated Successfully");
      dispatch(set_selected_group(response.data.data));
      handleClose();  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}><EditOutlinedIcon />Edit</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', bgcolor: '#17141a', color: 'white' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edit Channel Info
          </Typography>
          <Button autoFocus onClick={handleClose} color="inherit" size="small">
            x
          </Button>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#17141a', color: 'white' }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel Name"
            type="text"
            fullWidth
            variant="standard"
            required
            maxLength={50}
            name="name"
            value={channelData.name}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            id="description"
            label="Channel Description"
            multiline
            rows={3}
            fullWidth
            variant="standard"
            required
            maxLength={250}
            name="description"
            value={channelData.description}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            id="topic"
            label="Topic"
            multiline
            rows={3}
            fullWidth
            variant="standard"
            required
            maxLength={250}
            name="topic"
            value={channelData.topic}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <FormControlLabel
            control={<Checkbox checked={channelData.isPrivate} onChange={handleInputChange} name="isPrivate" />}
            label="Private Channel ?"
            style={{ color: 'white' }}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#17141a" }}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
          <Button onClick={updateGroupInfo} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
