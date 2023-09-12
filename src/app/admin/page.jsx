'use client'
import { selectUser } from "@/redux/userSlice";
import axios from "axios"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../header/page";
import Spinner from "@/spinner/Spinner";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import General from "@/components/General";
import AllBookings from "@/components/profileComponents/AllBookings";
import Hotels from "@/components/Hotels";
import Users from "@/components/profileComponents/Users";
import HotelList from "@/components/HotelList";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const  Admin=()=> {
const user= useSelector(selectUser)

const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




 
  return (
    <>
    <Header />
     <div className="p-5">

     {/* {user == null ? <Spinner /> : <p className="text-xl">{user.name}</p>} */}

     <Box sx={{ width: '80%', margin: 'auto'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
        <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Add Hotel" {...a11yProps(1)} />
          <Tab label="Hotels" {...a11yProps(2)} />
          <Tab label="Bookings" {...a11yProps(3)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <General />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Hotels />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <HotelList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <AllBookings />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={4}>
        <Users />
      </CustomTabPanel> */}
    </Box>








     </div>
    </>
  )
}

export default Admin