import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OutlinedCard = ({ handleClose }) => {
  const baseURL = "http://127.0.0.1:8000/";

  const workspaceDetails = useSelector(state => state.user_workspace_select);
  
  const handlePayment = async () => {
    toast.success("working");
    try {
      const token = localStorage.getItem('access');

      const response = await axios.post(
        baseURL + `payment/create-checkout-session/`,
        {"workspace_id": workspaceDetails.workspaceId}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("You are not authorized to perform this action.");
      } else {
        console.log(error);
      }
    }
  }
  
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            workspace 
          </Typography>
          <Typography variant="h5" component="div">
            {workspaceDetails.workspaceName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Upgrade to premium
          </Typography>
          <Typography variant='h4' color="green">
            ₹ 100
          </Typography>
          <br/>
          <Typography variant="body2">
            Premium Workspace for 30 days
            <br />
            - "Group Video Call"
            <br/>
            - "Group Audio Call"
          </Typography>
        </CardContent>
        <CardActions>
          <Button  color='secondary' onClick={handlePayment} variant='contained' size="large">Buy Premium</Button>
          <Button color='error' onClick={handleClose} size="large">Cancel</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default OutlinedCard;
