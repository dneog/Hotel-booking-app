'use client'
import React, { useEffect, useState } from 'react'
import ViewPopup from '../ViewPopup'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/userSlice'
import DefaultSpinner from '@/spinner/DefaultSpinner'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment'
import UserViewPopup from '../UserViewPopup'

const UserBookings = () => {

  const [hotels, setHotels]= useState([])
  const [loading, setLoading]= useState(false)
  
  const user= useSelector(selectUser);
console.log(hotels);
  const getHotels= async ()=> {
    try {
      setLoading(true)
    const response= await axios.get(`api/orderSuccess?current=${user._id}`)
    setHotels(response.data.data)
      
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }finally{
      setLoading(false)
    } 
  }



  useEffect(()=> {
    getHotels()
  },[])
  
  return (
    <>
    {hotels === null ? <p>No Bookings Found</p> : <div className='w-[95%] flex m-auto'>
{loading ? <DefaultSpinner /> :
<table className='w-full text-sm text-left text-gray-700 '>
<thead className='text-sm text-gray-100 uppercase  bg-gray-500'>

  <th className='px-6 py-3'>Image</th>
  <th className='px-6 py-3'>Hotels Name</th>
  <th className='px-6 py-3'>Dates</th>
  <th className='px-6 py-3'>Amount</th>
  <th className='px-6 py-3'>Status</th>
  <th className='px-6 py-3'>Actions</th>
</thead>
<tbody>
{hotels.map((hotel)=> (
 
  <tr className='bg-white border-b border-gray-300'>
   
      <>
        <td className='w-[50px] p-2' ><img src={hotel.image} alt="" /></td>
        <td className='px-6 py-4 text-base'>{hotel.name}</td>
        <td className='px-6 py-4'>{moment(hotel.fromSlot).format("DD-MM-YYYY")} to {moment(hotel.toSlot).format("DD-MM-YYYY")} </td>
        <td className='px-6 py-4'>{hotel.totalAmount} Rs</td>
        <td className='px-6 py-4'>✔️ Paid</td>
        <td className='px-6 py-4'>
          <UserViewPopup hotel={hotel} />
        
         
        </td>
      </>
      
      </tr>
    ))}
    

  
  
</tbody>
</table>
}
</div>
 }
    
    </>





    

  )
}

export default UserBookings