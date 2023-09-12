import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DefaultSpinner() {
  return (
    <Box sx={{  }}>
        <CircularProgress className='DefaultSpinner' size={24} color="success" />
    </Box>
  );
}