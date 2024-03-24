import * as React from 'react';
import {useState} from 'react';
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

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: 400,
    // overflowY: 'auto', // Enable vertical scroll
    bgcolor: '#17141a',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
  };



  export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
  //  ========================== member listing table ============================

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: 400,
    bgcolor: 'black', // Change background color to black
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
  };

    const [channelData, setChannelData] = useState({
        name: '',
        description: '',
        topic: '',
        is_private: false
      });
    
      const handleInputChange = (event) => {
        const { name, value, checked } = event.target;
        setChannelData(prevState => ({
          ...prevState,
          [name]: name === 'isPrivate' ? checked : value
        }));
      };
  //  =========================================================================== 
    return (
     <>
        <Button onClick={handleOpen}><EditOutlinedIcon/> </Button>
        
           
            
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' , bgcolor: '#17141a', color:'white' }}   >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Edit Channel Info
        </Typography>
        <Button autoFocus onClick={handleClose} color="inherit" size="small">
          x
        </Button>
      </DialogTitle >
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
    InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
    InputProps={{ style: { color: 'white' } }} // Set input color to white
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
    InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
    InputProps={{ style: { color: 'white' } }} // Set input color to white
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
    InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
    InputProps={{ style: { color: 'white' } }} // Set input color to white
  />
  <FormControlLabel
    control={<Checkbox checked={channelData.isPrivate} onChange={handleInputChange} name="isPrivate" />}
    label="Private Channel ?"
    style={{ color: 'white' }} // Set checkbox color to white
  />
</DialogContent>

      <DialogActions sx={{bgcolor:"#17141a"}}>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
        <Button  variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
            
          </>
       
      
    );
  }