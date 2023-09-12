import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const steps = ['Hotel Details', 'Rent', 'Images'];


const HotelForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [done, setDone]= React.useState(false)
    const router= useRouter()
    const [formData, setFormData]= React.useState({
        name: '',
        description: '',
        location: '',
        about1: '',
        about2: '',
        about: '',
        rent : '',
        image: ''
    })

    const {name, description, rent, image, location, about1, about2, about}= formData

    const handleInputChange=(e)=> {
        const {name, value}= e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit= async ()=> {
        console.log(formData);
       
          const response= await axios.post("/api/hotels", formData)
          toast.success("Hotel Added Successfully")
          
          setDone(!done)
       
    }
   
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    
  
    const handleReset = () => {
      setActiveStep(0);
      setDone(!done)
    };
  
  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
      
       
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    {done ? (
      <React.Fragment>

       
        <Typography sx={{ mt: 2, mb: 7, ml: 3 }}>
          Hotel Details Added Successfully
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
            <form className='flex flex-col space-y-3 p-4 w-[49.5%]' onSubmit={handleSubmit} >
                {activeStep === 0 && (
                    <input type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm' name="name" placeholder='Name' value={name} onChange={handleInputChange}  id="" />
                )}

                {activeStep=== 0 && (
                     <textarea type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm' name="description" placeholder='Description' value={description} onChange={handleInputChange}  id="" />
                )}
                 {activeStep === 0 && (
                    <input type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm' name="location" placeholder='Location' value={location} onChange={handleInputChange}  id="" />
                )}

                {activeStep=== 1 && (
                     <input type="number" className='p-1 text-[16px] border border-gray-400 rounded-sm' name="rent" placeholder='Rent per day' value={rent} onChange={handleInputChange}  id="" />
                )}
                  {activeStep=== 2 && (
                     <input type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm' name="image" placeholder='Image URL' value={image} onChange={handleInputChange}  id="" />
                )}
                <div className='flex flex-row'>
                {activeStep === 0 && (
                    <input type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm mr-3' name="about1" placeholder='Features 1' value={about1} onChange={handleInputChange}  id="" />
                )}
                {activeStep === 0 && (
                    <input type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm ' name="about2" placeholder='Features 2' value={about2} onChange={handleInputChange}  id="" />
                )}
                </div>
                {activeStep === 0 && (
                    <input type="text" className='p-1 text-[16px] border border-gray-400 rounded-sm ' name="about" placeholder='Highlights' value={about} onChange={handleInputChange}  id="" />
                )}

              
            </form>
            
            </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
         
         {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
         ) : (
            <Button onClick={handleNext}>Next</Button>
         )}
          
        </Box>
      </React.Fragment>
    )}
  </Box>
  )
}

export default HotelForm