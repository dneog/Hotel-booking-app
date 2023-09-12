import Header from '@/app/header/page'
import BookDate from '@/components/BookDate'
import HotelInfo from '@/components/HotelInfo'
import axios from 'axios'
import React from 'react'

const getHotel= async (hotelID)=> {
  try {
  const response= await axios.get(`${process.env.DOMAIN}/api/hotels/${hotelID}`)
  return response.data.data
    
  } catch (error) {
    console.log(error.message)
  }
}

const HotelDetails = async ({params}) => {
  const hotel= await getHotel(params.hotelID)


  return (
    <>
    <Header />
    <div className='flex max-w-[1250px] max-md:flex-wrap m-auto mt-5'>
      <div className='w-[100%] ml-3 mr-3'>
      <img className='min-w-[580px]  rounded-md' src={hotel.image} alt="" />
      <BookDate hotel={hotel} />
      </div>
     
      <HotelInfo hotel={hotel} />
    </div>
    
    
    </>
    
  )
}

export default HotelDetails