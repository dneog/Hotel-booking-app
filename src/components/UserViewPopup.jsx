

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

export default function UserViewPopup({hotel}) {
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
        Hotel Details
      </button>
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="Hotel Details"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Hotel Details
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
          <img className='w-[500px]' src={hotel.image} alt="" />
          </Typography>
            <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Name" variant="standard" value={hotel.name} />
          </Typography>
    
            <Typography  gutterBottom>
          <TextField className='w-[500px]' id="outlined-multiline-static"  multiline
           placeholder='Description' label="Description"
          defaultValue="Hotel Description" variant="standard"  value={hotel.hotel.description}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Location" variant="standard" value={hotel.hotel.location}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Features 1" variant="standard"  value={hotel.hotel.about1}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Features 2" variant="standard" name='about2' value={hotel.hotel.about2}  />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Highlights" variant="standard" name='about' value={hotel.hotel.about} />
          </Typography>


            <Typography gutterBottom>
          <TextField className='w-[500px]' id="outlined-number" type='number' label="Rent per Day" variant="standard" name='rent' value={hotel.hotel.rent}  />
          </Typography>

            
          
         
        </DialogContent>
       
      </BootstrapDialog>
    </div>
  );
}