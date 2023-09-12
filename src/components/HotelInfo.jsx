'use client'
import React, { useState } from 'react'

const HotelInfo = ({hotel}) => {



  return (
    <div className='mx-2'>
        <h2 className='text-3xl font-semibold text-gray-600'>{hotel.name}</h2>
        <p className='mt-3 mb-3'>{hotel.description}</p>
        <span className=' bg-amber-600 text-white px-2 rounded-md py-1'>🎖️ {hotel.about} 
        </span> <br />
        <p className='border-b-2 border-b-green-500 w-20 mt-3 mb-1 text-[18px] font-semibold'>Features</p>
        <p>🔸{hotel.about1}</p>
        <p>🔸{hotel.about2}</p>
        <p className='border-b-2 border-b-green-500 w-11 mt-3 mb-1 text-[18px] font-semibold'>Rent</p>
        <p className='mt-2 text-base '><span className='font-semibold text-xl'>{hotel.rent}&#8377;</span> per day</p>
       
        
       
    </div>
  )
}

export default HotelInfo