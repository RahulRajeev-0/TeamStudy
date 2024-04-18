import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UnlockButton from './UnlockPremiumButton';
import OutlinedCard from './PremiumCard'; // Import the OutlinedCard component

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f0f0f0', // Change the background color here
  color: '#333',
  borderRadius: 5,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}><UnlockButton/></Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Unlock Premium Workspace 
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          </Typography>
          {/* Display the OutlinedCard component here */}
          <OutlinedCard />
        </Box>
      </Modal>
    </div>
  );
}
