'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const HomeCards = ({hotel}) => {
  const router= useRouter()
 

  const shortenText= (text, n)=> {
    if(text.length > n){
      const shortenedText= text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  }
  return (
    <div className='max-w-xs bg-white rounded-lg shadow-lg border border-gray-200  m-3'>
        <img className='rounded-t-lg' src={hotel.image} alt="" />

        <div className='p-2 flex justify-between items-center'>
          <h5 className='text-2xl font-bold tracking-tight text-gray-700'>{hotel.name}</h5>
          <p className='bg-amber-500 px-2 text-white rounded-md text-[14px]'>{hotel.location}</p>
          </div>
          <p className='mb-3 font-normal px-2 text-[14px] text-gray-600'>{shortenText(hotel.description, 115)}</p>
        
        <div className='flex justify-between items-center px-2 pb-4'>
          <p><span className='font-semibold'>{hotel.rent} &#8377;</span>/day</p>
          <button className='bg-slate-700 text-white py-1 px-3 rounded-sm' onClick={()=> router.push(`/hotelDetails/${hotel._id}`)}>View Details</button>
        </div>
    </div>
  )
}

export default HomeCards