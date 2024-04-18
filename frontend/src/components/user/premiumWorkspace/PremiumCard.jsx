import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux
import { useSelector } from 'react-redux'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

// Define the card component with props
const OutlinedCard = ({ workspaceDetails }) => {

    const price = '100'
    
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          workspace 
        </Typography>
        {/* Use workspace name from Redux slice */}
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
        <Button  color='secondary' variant='contained' size="large">Buy Premium</Button>
        <Button color='error'  size="large">Cancel</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default function App() {
  // Get workspace details from Redux slice
  const workspaceDetails = useSelector(state => state.user_workspace_select);
  
  return (
    <OutlinedCard workspaceDetails={workspaceDetails} />
  );
}
