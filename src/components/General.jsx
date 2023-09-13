'use client'
import { SET_USER, selectUser } from '@/redux/userSlice';
import Spinner from '@/spinner/Spinner';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


 

const General = () => {
  const user= useSelector(selectUser)
  const router= useRouter()
  const dispatch= useDispatch()
const [formData, setFormData]= useState({
  name: user?.name || '',
  email: user?.email || '',
  password: user?.password || '',
})

const {name, email, password}= formData
const [loading, setLoading]= useState(false)

console.log(user);

const handleInputChange= (e)=> {
    const {name, value}= e.target
    setFormData({...formData, [name] : value})
}
const register= async (e)=> {
  e.preventDefault()
    setLoading(true)
    
    const userData= {
        name, email, password
       }

       console.log(userData);

    try {
       const response= await axios.put(`/api/users/${user._id}`, userData)
      
      dispatch(SET_USER(response.data.data))
      console.log(response.data.data);
       toast.success('Profile Updated Successfully', {
        position: "top-center",
        });
        
        setLoading(false)
        
    } catch (error) {
        toast.error(error.response.data.message || error.message, {
            position: "top-center",
            });
            setLoading(false)
    }
    
    
}
  return (
    <>
   {!user && <Spinner />}
    <div className='max-w-[26%] min-w-[400px]  p-5 pb-7  m-auto mt-[10px] rounded-md shadow-md bg-white'>
      <p className='text-lg font-semibold border-b-2 mb-2 pb-1'>Profile Details</p>
        <form onSubmit={register} className='flex flex-col'>
        <label htmlFor="">Name</label>
        <input type="text" className='p-2 mt-1 mb-3 rounded-sm border border-gray-400' disabled name="name" value={name} onChange={handleInputChange} id="" placeholder='Name' />
        <label htmlFor="">Email</label>
        <input type="email" name="email" value={email} onChange={handleInputChange} id="" placeholder='Email' disabled  className='p-2 rounded-sm border border-gray-400 mt-1 mb-3'/>
        {/* <label htmlFor="">Update Password</label> */}
        {/* <input type="password" name="password" value={password} onChange={handleInputChange} id="" placeholder='Password' className='p-2 rounded-sm border border-gray-400 mt-1 mb-3' /> */}

        {/* <button type='submit' className='bg-emerald-600 text-white p-2 mt-1 mb-3 rounded-sm'>{loading ? <Spinner /> : "Update Profile"}</button> */}
        

    </form> 
   

</div>
  
   </>
  )
}

export default General