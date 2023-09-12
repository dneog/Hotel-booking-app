'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, selectUser } from '@/redux/userSlice'



const Header = () => {
  const router= useRouter()
  const logo= '/logo.png'
  const dispatch= useDispatch()
  const users= useSelector(selectUser)
 const pathName= usePathname()


  const [currentUser, setCurrentUser] = useState(null)

  console.log(users);
  




  useEffect(()=> {
    async function fetchCurrentUser(){
      try {
        const response= await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/currentUser`)
        // 'http://localhost:3000/api/users/currentUser'
       
        setCurrentUser(response.data.data)
        dispatch(SET_USER(response.data.data))
       
        
      }catch(error){
        console.log(error);
      }
    }
 
    fetchCurrentUser()
  
     

  }, [dispatch])



  // useEffect(()=> {
  //   fetchCurrentUser()
  //   dispatch(SET_USER(currentUser))
  // },[dispatch])





  



const onLogout= async ()=> {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/logout`)
    // 'http://localhost:3000/api/users/logout'

    toast.success('Logout Successful', {
      position: "top-center",
      });
      router.push('/login')

  } catch (error) {
    console.log(error);
  }
}


const handleClick=()=> {
  router.push("/")
}
  return (
    <div className='h-[62px] sticky top-0 bg-white drop-shadow-sm flex justify-between'>
        <div>
        <img className='w-[150px] bottom-11 relative cursor-pointer' src={logo} alt="My Hotel" onClick={handleClick} />
        </div>

        <div className='flex h-[62px] items-center space-x-10 text-[18px] pr-5'>

        <Link href={'/'}>
            <p className=''>Home</p>
            </Link>

          {users!== null ? (<p className='cursor-pointer' onClick={onLogout}>Logout</p>) :  (<Link href={'/login'}>
            <p>Login</p>
            </Link>) }

          {users!== null && <Link href={users.isAdmin === false ? '/profile' : '/admin'}><FaUserCircle size={25} /></Link>}
           
          
           
           
        </div>
       
    </div>
  )
}

export default Header