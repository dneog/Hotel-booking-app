'use client'


import React, {  useState } from 'react'
import Header from '../header/page'



import {  useSelector } from 'react-redux';
import getStipePromise from '@/app/lib/stripe';

import { SET_USER, selectUser } from '@/redux/userSlice';

import { selectUserOrder } from '@/redux/orderSlice';


const UserCheck = () => {



  


  
    const user= useSelector(selectUser)
    const hotel= useSelector(selectUserOrder)




    




    const [formData, setFormData]= useState({
        userName: '',
        address: '',
        city: '',
        phone: '',
        pin: '',
        state: '',
        country: ''
        
    })

    const {userName, address, city, phone, pin, state, country}= formData

    const handleInputChange= (e)=> {
        const {name, value}= e.target
        setFormData({...formData, [name]: value})
    }

    const items= [
        {
              name: hotel.name,
              hotel: hotel.hotel,
              user: hotel.user,
              fromSlot: hotel.fromSlot,
              toSlot: hotel.toSlot,
              totalAmount: hotel.totalAmount,
              quantity: 1
        }
      ]

    const saveItem= {
        name: hotel.name,
        hotel: hotel.hotel,
        user: hotel.user,
        fromSlot: hotel.fromSlot,
        toSlot: hotel.toSlot,
        totalAmount: hotel.totalAmount,
        userName: formData.userName,
        address : formData.address, 
        city : formData.city, 
        phone : formData.phone, 
        pin : formData.pin, 
        state : formData.state, 
        country: formData.country,
        image: hotel.image
    }  


      const storeItems= JSON.stringify(saveItem)

    const handleSubmit= async (e)=> {
        e.preventDefault()
        localStorage.setItem('item', storeItems)

       
        const stripe = await getStipePromise();
        const response = await fetch("/api/bookings/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify(items),
        });
    
        const data = await response.json();
        if (data.session) {
          stripe?.redirectToCheckout({ sessionId: data.session.id });
        }

        

    }

   



  return (
    <>
    <Header />
    <div className=' w-[38%] m-auto mt-12 shadow-xl bg-white rounded-lg p-5 '>
        <p className='pb-4 text-lg text-center  text-purple-600'>Address</p>
        <form className='flex flex-col space-y-3' onSubmit={handleSubmit}>
            <input type="text" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='Name' name='userName' value={userName} onChange={handleInputChange} />
            <textarea type="text" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='Address' name='address' value={address} onChange={handleInputChange} />
            <input type="text" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='City' name='city' value={city} onChange={handleInputChange} />

            <input type="number" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='Phone Number' name='phone' value={phone} onChange={handleInputChange} />

            <input type="number" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='Pin' name='pin' value={pin} onChange={handleInputChange} />

            <input type="text" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='State' name='state' value={state} onChange={handleInputChange} />

            <input type="text" className='border border-gray-300 rounded-sm px-2 py-1' placeholder='Country' name='country' value={country} onChange={handleInputChange} />

            <button className='bg-purple-500 text-white rounded-sm px-2 py-[7px]' type='submit'>Submit</button>
        </form>
    </div>
    </>
    
  )
}

export default UserCheck