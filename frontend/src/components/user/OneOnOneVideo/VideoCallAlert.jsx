import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';



export default function VideoCallAlert({roomId, setShowVideoCallAlert}) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
        severity="info"
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  navigate(`/one-to-one-video/${roomId}`)
                }}
              >
                Join
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            
            </React.Fragment>
          }
          sx={{ mb: 2 }}
        >
        
         <AlertTitle>Info</AlertTitle>
       started a video call 
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        join video call
      </Button>
      <Button
        disabled={open}
       
        variant="outlined"
        onClick={() => {
         setShowVideoCallAlert(false)
        }}
      >
        Remove 
      </Button>
    </Box>
  );
}
