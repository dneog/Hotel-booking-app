'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, selectUser } from '@/redux/userSlice'



const HeaderLogin = () => {
  const router= useRouter()
  const logo= '/logo.png'
  



 










  





const handleClick=()=> {
  router.push("/")
}
  return (
    <div className='h-[62px] sticky top-0 bg-white drop-shadow-sm flex justify-between'>
        <div>
        <img className='w-[150px] bottom-11 relative cursor-pointer' src={logo} alt="My Hotel" onClick={handleClick} />
        </div>

        <div className='flex h-[62px] items-center space-x-10 text-[18px] pr-5'>

        

         
         
           

         
           
          
           
           
        </div>
       
    </div>
  )
}

export default HeaderLogin