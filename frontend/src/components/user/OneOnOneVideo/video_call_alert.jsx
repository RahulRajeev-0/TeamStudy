import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);

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
                  console.log("Button inside alert clicked!");
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
        call
      </Button>
    </Box>
  );
}
