import * as React  from 'react';
import { useState, useEffect } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

// icon
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';



import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { toast } from 'react-toastify';

import { useSelector } from 'react-redux'



// ============================ Accordion settings ===========================

// Create a dark theme  
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'transparent', // Set background to transparent
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


// ==================================================================================




export default function CustomizedAccordions() {

  const baseURL = "http://127.0.0.1:8000/"
  const userProfileDetails = useSelector(state => state.workspaceUserProfile);
  const [show, setShow] = useState(false);

  const [workspaceGroups, setWorkspaceGroups] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [expanded, setExpanded] = React.useState('panel1');

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

  const handleSubmit = async () => {
    if (channelData.name.trim() === '' || channelData.description.trim() === '' || channelData.topic.trim() === '') {
      toast.warning("Please Fill all the required fields");
      return;}
      const token = localStorage.getItem('access')
      const headers = {
        'Authorization': `Bearer ${token}`, // Add space after 'Bearer'
        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for FormData
      };
      try{
        const workspace_id = sessionStorage.getItem('workspaceId')
        const  member_id = userProfileDetails.id
        
        const response = await axios.post(baseURL+`group/workspace-group-create/${workspace_id}/${member_id}/`,
        channelData,{ headers }
         )

         if (response.status === 201){
          toast.success("Channel created Successfully")
         }


      }catch(error){
        console.log(error)
      }


    handleClose();
    setChannelData({
      name: '',
      description: '',
      topic: '',
      is_private: false
    })

  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  // const function for fetching channels 
  const fetchChannels = async () => {
    try{
      const token = localStorage.getItem('access')
      const headers = {
        'Authorization': `Bearer ${token}`, // Add space after 'Bearer'
      };
      const workspace_id = sessionStorage.getItem("workspaceId")
      const member_id = userProfileDetails.id
      const response = await axios.get(baseURL+`group/workspace-group-list/${workspace_id}/${member_id}/`, {headers})
      setWorkspaceGroups(response.data)

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchChannels();
  },[handleSubmit])

 
  

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography><GroupIcon/> Channels</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
           
            <Button color="secondary" variant="outlined" onClick={handleShow}  ><AddIcon/> Create Channel</Button>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px',  }}>
            {workspaceGroups.map(group => (
              <Button  key={group.id} onClick={() => handleGroupSelect(group.name)} size="small"  style={{ marginBottom: '8px', color:'grey', fontWeight:'bold' }}>
               # {group.name}
     
              </Button>
             
            ))}
          </div>
          
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        
      </div>
    </ThemeProvider>

    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create New Channel
        </Typography>
        <Button autoFocus onClick={handleClose} color="inherit" size="small">
          x
        </Button>
      </DialogTitle>
      <DialogContent>
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
        />
        <FormControlLabel
          control={<Checkbox checked={channelData.isPrivate} onChange={handleInputChange} name="isPrivate" />}
          label="Private Channel ?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Workspace
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
