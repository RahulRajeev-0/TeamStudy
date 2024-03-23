import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// icons
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

// material ui table 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: 400,
    overflowY: 'auto', // Enable vertical scroll
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
const members = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
  ];
//  =========================================================================== 
  return (
    <div>
      <Button onClick={handleOpen}><ManageAccountsOutlinedIcon/> </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Member Management 
          </Typography>
         
          <Typography id="modal-modal-description" sx={{ mt: 2 , color: 'white'}}>
          <Button variant="contained" color='success'>Add a member</Button>
          <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto', backgroundColor:"black"}}>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell style={{ color: 'white' }}>User Name</TableCell>
        <TableCell style={{ color: 'white' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell style={{ color: 'white' }}>{member.name}</TableCell>
                      <TableCell>
                        {/* Add your action buttons here */}
                        <Button >
                          Kick Out
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          
          
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}