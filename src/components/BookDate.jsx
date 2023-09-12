'use client'
import React, { useState } from 'react'
import { DatePicker, Space} from 'antd';
import moment, { locale } from 'moment/moment';
const { RangePicker } = DatePicker;
import { useSelector } from 'react-redux';
import getStipePromise from '@/app/lib/stripe';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { selectUser } from '@/redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validateJWTToken } from "@/helpers/tokenValidation";
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';

import CheckSpinner from '@/spinner/CheckSpinner';
import { ORDER_DETAILS, USER_ORDER, selectUserOrder } from '@/redux/orderSlice';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BookDate = ({hotel}) => {
    const [fromSlot, setFromSlot]= useState(null)
    const [toSlot, setToSlot]= useState(null)
    const [total, setTotal]= useState(null)
    const[ available, setIsAvailable]= useState(false)
    const [loading, setLoading]= useState(false)
    const route= useRouter()
    const user= useSelector(selectUser)
    const userOrders= useSelector(selectUserOrder)
    const dispatch= useDispatch()

    console.log(user);
   console.log(userOrders);
      
      
    const handleRange= (value)=> {
            const startDate= value[0].toDate()
            const endDate= value[1].toDate()
           
            setFromSlot(startDate)
            setToSlot(endDate)
            if(value[0] && value[1]){
              const days= moment(endDate).diff(moment(startDate), 'days') + 1;
              const totalRent= days * hotel.rent
              setTotal(totalRent)
            }else{
              setTotal(null)
            }
    }
   

    const checkIsAvailable= async ()=> {
        setLoading(true)
        try {
            
            const response= await axios.post("/api/check", {
                hotel: hotel._id,
                fromSlot,
                toSlot
            })
           if(response.data.success){
            toast.success('Slots Available')
            setIsAvailable(true)
            setLoading(false)
         
           
                 
                 
            
           
           }else{
            toast.error("Slots are not Available")
            setLoading(false)
           }
            
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

   

    

    const handlePayment= async ()=> {
      
      // const stripe = await getStipePromise();
      // const response = await fetch("/api/bookings/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   cache: "no-cache",
      //   body: JSON.stringify(items),
      // });
  
      // const data = await response.json();
      // if (data.session) {
      //   stripe?.redirectToCheckout({ sessionId: data.session.id });
      // }
     await dispatch(USER_ORDER(
        {
          name: hotel.name,
          hotel: hotel._id,
          user: user._id,
          fromSlot,
          toSlot,
          totalAmount: total,
          image: hotel.image
        }
      ))

      route.push('/form')
    }

      
    
    


  return (
    <>
    <div className='max-w-[1250px] m-auto'>
    <p className='  border-b-2 border-b-green-500 w-24 mt-3 mb-3 text-[18px] font-semibold'>Book Slot</p>
    </div>
   
    
    <div className='max-w-[1250px] m-auto flex items-center '>
         
         <Space direction="horizental" size={30}>
         <RangePicker className='text-xl p-2 px-7'
         format="YYYY-MM-DD"
         onChange={handleRange}
        disabledDate={(current)=> {
            return current && current <= moment().endOf("day")
        }}
         />
         </Space>
         
          <button className='bg-green-600 rounded-sm text-white px-4 text-[18px] py-[5px] ml-3' onClick={checkIsAvailable}>
          {loading ? <CheckSpinner /> : 'Check' }</button> 
          
        
        
         
    </div>

    {available && fromSlot && toSlot && <>
    <div className=' max-w-[1250px] m-auto mt-3'>
    <p className='mt-2'><span className='font-semibold'>Booking Dates : </span>
          {fromSlot ? moment(fromSlot).format('LL') : "None"} - {toSlot && fromSlot !== toSlot ? moment(toSlot).format('LL') : 'None'}
        
         </p>

         <p><span className='font-semibold'>Total Amount : </span> {total} &#8377; </p>
         {user !== null ? 
        //  <StripeCheckout
        //     stripeKey='pk_test_51NJuJHSBJDURoFG2nLdVOF7bggY4v1sj7oLcjyDJ3BPjDC7kfkrLp8OOuWIoS2wVDhRoI1X4GE9bZTM58dUFJ2cg00fPQmMgYW'
        //     token= {bookNow}
        //     key={'pk_test_51NJuJHSBJDURoFG2nLdVOF7bggY4v1sj7oLcjyDJ3BPjDC7kfkrLp8OOuWIoS2wVDhRoI1X4GE9bZTM58dUFJ2cg00fPQmMgYW'}
        //     amount={total * 100}
        //     shippingAddress
        //     currency='INR'
        //  >
         <button className='bg-green-600 rounded-sm text-white px-4 text-[18px] py-1 mt-2 'onClick={handlePayment}>
           Book Now</button>
         
         
           
           : <button className='bg-green-600 rounded-sm text-white px-4 text-[18px] py-1 mt-2 ' onClick={()=> route.push('/login')} >
           Book Now</button> }
           </div>
         
</>}

    </>
  )
}

export default BookDate