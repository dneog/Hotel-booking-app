'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Header from '../header/page'
import { selectLoading } from '@/redux/loaderSlice'
import { useSelector } from 'react-redux'
import { signIn } from 'next-auth/react'
import HeaderLogin from '../../components/headerLogin'
import Spinner from '@/spinner/Spinner'

const initialData= {
    email: '',
    password: ''
}
const Login = () => {
    const [loading, setLoading]= useState(false)

    const lod= '/l1.gif'
    
    const router= useRouter()
    const [formData, setFormData]= useState(initialData)
    const { email, password}= formData

    const handleLoginGuest=()=> {
        setFormData({
            email: 'test@gmail.com',
            password:'123456'
        })
    
      }

    const handleInputChange= (e)=> {
        const {name, value}= e.target
        setFormData({...formData, [name] : value})
    }
    const register= async (e)=> {
        setLoading(true)
        e.preventDefault()
        if( !email || !password){
            toast.error('Please fill all the fields', {
                position: "top-center",
                });
        }
        if(password.length  < 6){
            toast.error('Password Should be minimum 6 character', {
                position: "top-center",
                });
        }

        const userData= {
            email, password
           }

        //    try {
        //    const res=  await signIn("credentials", {
        //         email, password, redirect: false
        //     })

        //     if(res.error){
        //         toast.error("Invalid Credentials")
        //         return
        //     }
        //     router.push("/order")
        //    } catch (error) {
        //     console.log(error);
        //    }
           try {
            const response= await axios.post("/api/users/login", userData)
            console.log(response.data.message);
            console.log(response.data);
            toast.success(response.data.message, {
             position: "top-center",
             });
             

             router.push("/")
             setLoading(false)

             
         } catch (error) {
             toast.error(error.response.data.message || error.message, {
                 position: "top-center",
                 });

                 setLoading(false)
         }
         

        
    }

  return (
    <>
    <HeaderLogin />

 
    <div className='max-w-[26%] min-w-[350px]  p-5 pb-7 shadow-xl rounded-lg m-auto mt-[110px] bg-white'>
        <form action="" onSubmit={register} className='flex flex-col space-y-4'>
            <p className='text-[18px] text-center mt-1'>Login</p>

            <input type="email" name="email" value={email} onChange={handleInputChange} id="" placeholder='Email'  className='p-2 rounded-sm border border-gray-400'/>

            <input type="password" name="password" value={password} onChange={handleInputChange} id="" placeholder='Password' className='p-2 rounded-sm border border-gray-400' />

            <button type='submit' className='bg-emerald-600 text-white p-2 rounded-sm'>{loading ? <Spinner /> : "Login"}</button>

        </form>
        <div className='flex flex-col w-[350px] justify-center m-auto'>
    <p className='text-center mt-1 mb-2'>or</p>
    <button type='submit' className=' text-black border border-gray-700 p-2 rounded-sm hover:bg-slate-50 ' onClick={handleLoginGuest}>Login with Test Account</button>
    </div>

    </div>
    
    <p className='text-center pt-3'>Don't have an Account ? <Link href={'/register'}><span className='text-sky-800'>Signup</span></Link></p>

    
   
    
    
    
    </>
  )
}

export default Login