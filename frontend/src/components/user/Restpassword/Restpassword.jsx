import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// toast.configure();

const steps = [
  {
    label: 'Rest Password',
    description: `Are you sure you want to change the password? 
    If yes, move to the next step.
    The password should be least 8 character long without blank spaces`,
  },
  {
    label: 'Enter Current Password',
    description: 'Please enter the current password in the input box.',
  }
];

export default function PasswordResetModal({ open, handleClose }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const maxSteps = steps.length;
  const baseURL = import.meta.env.VITE_API_BASE_URL
  
  const validatePassword = (password) => {
    if (password.includes(' ')) {
      toast.warning('Password should not include blank spaces');
      return false;
    }
    if (password.length < 8) {
      toast.warning('Password should contain at least 8 characters');
      return false;
    }
    return true;
  };

  const changePassword = async (e)=>{
    e.preventDefault();
    if (!validatePassword(newPassword)) return;
    if (!validatePassword(newPassword)) return;

    if (newPassword !== confirmPassword) {
      toast.warning('Passwords do not match');
      return;
    }
    const token = localStorage.getItem('access')
    try{
      const response = await axios.patch(
        `${baseURL}/user/userprofile/`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200){
        toast.success("password updated")
      }else{
        toast.error('something went wrong')
      }
     
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message)
    }
    

  }


  const handleNext = async () => {
    
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const closing = () =>{
    setActiveStep(0)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    handleClose()
  }

  return (
    <Modal open={open} onClose={closing}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          
          boxShadow: 24,
          borderRadius: 12,
          p: 4,
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography fontSize={25}>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 355, maxWidth: 400, width: '100%', p: 3.5 }}>
          <Typography>{steps[activeStep].description}</Typography>
          {activeStep === 1 && (
            <>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              />
            <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
          <Button color='secondary' onClick={changePassword} variant='contained'>Reset password</Button>
          </>
          )}
          
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Modal>
  );
}
