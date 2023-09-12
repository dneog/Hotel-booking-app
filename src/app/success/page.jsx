'use client'
import React, { useEffect } from 'react'
import Header from '../header/page'
import { useRouter } from 'next/navigation'




const page = () => {
  const verify= '/verified.png'
 const router= useRouter()
  useEffect(()=> {
    
        const handleData= async()=> {
          const newOrder = localStorage.getItem('item')
          if(newOrder){
            const order= JSON.parse(newOrder)
            const response = await fetch("/api/orderSuccess/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              cache: "no-cache",
              body: JSON.stringify(order),
            }).then((response)=> {
              if(response.ok){
                localStorage.removeItem('item')
              }
            })
               
          }else{
            console.log('Item Not found');
          }
       
          
          }
         
          handleData()
    
}, [])

  return (
    <>
    <Header />
     <div className='w-[250px] m-auto mt-[190px] text-center items-center'>
      <img className='w-20 m-auto mb-3' src={verify} alt="" />
      <p className='text-xl'>Payment Successful</p>
      <div className='flex justify-between mt-3'>
      <button className='bg-amber-500 text-white px-2 py-1 text-base rounded-md' onClick={()=> router.push('/profile')}>Order Details</button>
        <button className='bg-violet-600 text-white px-2 py-1 text-base rounded-md' onClick={()=> router.push('/')}>Back to Home</button>
      </div>
     
      </div>
    </>
   
  )
}

export default page