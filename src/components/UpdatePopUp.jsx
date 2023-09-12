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
import { FaEdit } from "react-icons/fa";
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

export default function UpdatePopUp({hotel, getHotels}) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData]= React.useState({
    name: hotel?.name || '',
    description: hotel?.description || '',
    location: hotel?.location || '',
    about1: hotel?.about1 || '',
    about2: hotel?.about2 || '',
    about: hotel?.about || '',
    rent : hotel?.rent || '',
    image: hotel?.image || '',
  })
const handleInputChange=(e)=> {
    const {name, value}= e.target;
    setFormData({...formData, [name]: value})
}

const handleSubmit= async ()=> {

    try {
        formData._id= hotel._id
        const response= await axios.put(`/api/hotels/${hotel._id}`, formData)
        toast.success(response.data.message)
        getHotels()
        setOpen(false);

    } catch (error) {
        console.log(error);
    }
   
   

}

const {name, description, rent, image, location, about1, about2, about}= formData
    console.log(hotel);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button variant="" className='' onClick={handleClickOpen}>
        <FaEdit className='mt-[5px] mr-3' size={22}/>
      </button>
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="Update Hotel Details"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update Hotel Details
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
            <form onSubmit={handleSubmit}>
            <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Name" variant="standard" name='name' value={name} onChange={handleInputChange} />
          </Typography>
    
            <Typography  gutterBottom>
          <TextField className='w-[500px]' id="outlined-multiline-static"  multiline
          rows={4} placeholder='Description' label="Description"
          defaultValue="Hotel Description" variant="standard" name='description' value={description} onChange={handleInputChange} />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Location" variant="standard" name='location' value={location} onChange={handleInputChange} />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Features 1" variant="standard" name='about1' value={about1} onChange={handleInputChange} />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Features 2" variant="standard" name='about2' value={about2} onChange={handleInputChange} />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Highlights" variant="standard" name='about' value={about} onChange={handleInputChange} />
          </Typography>

          <Typography  gutterBottom>
          <TextField className='w-[500px]' id="standard-basic" label="Image URL" variant="standard" name='image' value={image} onChange={handleInputChange} />
          </Typography>

            <Typography gutterBottom>
          <TextField className='w-[500px]' id="outlined-number" type='number' label="Rent" variant="standard" name='rent' value={rent} onChange={handleInputChange} />
          </Typography>

            </form>
          
         
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}