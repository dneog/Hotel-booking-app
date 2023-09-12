'use client'
import DefaultSpinner from '@/spinner/DefaultSpinner'
import Spinner from '@/spinner/Spinner'
import axios from 'axios'
import { Spinnaker } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Link from 'next/link'
import UpdatePopUp from './UpdatePopUp'
import ViewPopup from './ViewPopup'

const HotelList = () => {

  const [hotels, setHotels]= useState([])
  const [loading, setLoading]= useState(false)

  const getHotels= async ()=> {
    try {
      setLoading(true)
    const response= await axios.get("api/hotels")
    setHotels(response.data.data)
      
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }finally{
      setLoading(false)
    } 
  }

  const deleteHotels= async (hotelId) => {
    try {
      const response= await axios.delete(`/api/hotels/${hotelId}`)
      toast.success(response.data.message)
      getHotels()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getHotels()
  },[])

  console.log(hotels);
  return (
    <div className='w-[95%] flex m-auto'>
        {loading ? <DefaultSpinner /> :
      <table className='w-full text-sm text-left text-gray-700 '>
        <thead className='text-sm text-gray-100 uppercase  bg-gray-500'>

          <th className='px-6 py-3'>Image</th>
          <th className='px-6 py-3'>Hotels Name</th>
          <th className='px-6 py-3'>Location</th>
          <th className='px-6 py-3'>Rent</th>
          <th className='px-6 py-3'>Actions</th>
        </thead>
        <tbody>
        {hotels.map((hotel)=> (
          <tr className='bg-white border-b border-gray-300'>
           
              <>
                <td className='w-[50px] p-2' ><img src={hotel.image} alt="" /></td>
                <td className='px-6 py-4 text-base'>{hotel.name}</td>
                <td className='px-6 py-4'>{hotel.location}</td>
                <td className='px-6 py-4'>{hotel.rent} Rs/Day</td>

                <td className='px-6 py-[19px] flex'>
                  <ViewPopup hotel={hotel} />
                  <UpdatePopUp hotel={hotel} getHotels={getHotels} />

                  <AiOutlineDelete size={24} onClick={() =>deleteHotels(hotel._id)} className='mt-[4px] cursor-pointer' />
                 
                </td>
              </>
              
              </tr>
            ))}
            

          
          
        </tbody>
      </table>
  }
    </div>
  )
}

export default HotelList