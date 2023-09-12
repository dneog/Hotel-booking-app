

'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { MdGridView } from "react-icons/md";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomerPopup({hotel}) {
  const [open, setOpen] = React.useState(false);




   
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button variant="" className='text-blue-500' onClick={handleClickOpen}>
        User Details
      </button>
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="Hotel Details"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        User Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
           
            
            <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Name" variant="standard" value={hotel.userName} />
          </Typography>
    
            <Typography  gutterBottom>
          <TextField className='w-[500px]' id="outlined-multiline-static"  multiline
           placeholder='Address' label="Address"
          defaultValue="User Address" variant="standard"  value={hotel.address}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Phone Number" variant="standard" value={hotel.phone}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Pin Number" variant="standard"  value={hotel.pin}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="City" variant="standard" name='about2' value={hotel.city}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="State" variant="standard" name='about' value={hotel.state} />
          </Typography>


            <Typography gutterBottom>
          <TextField className='w-[500px]' id="outlined-number" type='text' label="Country" variant="standard" name='rent' value={hotel.country}  />
          </Typography>

            
          
         
        </DialogContent>
       
      </BootstrapDialog>
    </div>
  );
}