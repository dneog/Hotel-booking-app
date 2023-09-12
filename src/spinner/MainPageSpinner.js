import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function MainPageSpinner() {
  return (
    <Box sx={{  }}>
        <CircularProgress className='DefaultSpinnerMain' size={32} color="success"/>
    </Box>
  );
}