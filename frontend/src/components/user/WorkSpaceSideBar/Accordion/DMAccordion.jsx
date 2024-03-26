import * as React from 'react';
import {useState, useEffect} from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

// react router dom
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// icon

import MessageIcon from '@mui/icons-material/Message';




//  ===================================== Accordion ===========================
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


//  ========================================================================


export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [workspaceMembers, setWorkspaceMembers] = useState([])
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000/"
  const userProfileDetails = useSelector(state => state.workspaceUserProfile);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const fetchDM = async () => {
    try{
      const token = localStorage.getItem('access')
      const headers = {
        'Authorization': `Bearer ${token}`, // Add space after 'Bearer'
      };
      const workspace_id = sessionStorage.getItem("workspaceId")
      const member_id = userProfileDetails.id
      const response = await axios.get(baseURL+`workspace/workspace-member-list/${workspace_id}/`, {headers})
      console.log(response.data);
      setWorkspaceMembers(response.data)

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchDM();
  },[])
  

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography><MessageIcon/> Direct Messages</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px',  }}>
              {workspaceMembers.map((user => (
                <Button key={user.id} onClick={() =>  navigate(`/workspace-dm/${user.id}`)} size="small"  style={{ marginBottom: '8px', color:'grey', fontWeight:'bold' }} >
                  {user.user.username} 
                </Button>
              )))}
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        
      </div>
    </ThemeProvider>
  );
}
