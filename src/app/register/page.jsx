'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import HeaderLogin from '../../components/headerLogin'
import Spinner from '@/spinner/Spinner'
import { useRouter } from 'next/navigation'

const initialData= {
    name: '',
    email: '',
    password: ''
}
const Register = () => {
    const router= useRouter()
    const [formData, setFormData]= useState(initialData)
    const {name, email, password}= formData
    const [loading, setLoading]= useState(false)
    
    const handleInputChange= (e)=> {
        const {name, value}= e.target
        setFormData({...formData, [name] : value})
    }
    const register= async (e)=> {
        setLoading(true)
        e.preventDefault()
        if(!name || !email || !password){
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
            name, email, password
           }

           console.log(userData);

        try {
           const response= await axios.post("/api/users/register", userData)
           console.log(response.data.message);

           toast.success(response.data.message, {
            position: "top-center",
            });
            router.push("/login")
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
    <div className='max-w-[26%] min-w-[350px]  p-5 pb-7 border border-gray-500 m-auto mt-[110px] bg-white'>
        <form action="" onSubmit={register} className='flex flex-col space-y-4'>
            <p className='text-[18px] text-center mt-1'>Create an Account</p>

            <input type="text" className='p-2 rounded-sm border border-gray-400' name="name" value={name} onChange={handleInputChange} id="" placeholder='Name' />

            <input type="email" name="email" value={email} onChange={handleInputChange} id="" placeholder='Email'  className='p-2 rounded-sm border border-gray-400'/>

            <input type="password" name="password" value={password} onChange={handleInputChange} id="" placeholder='Password' className='p-2 rounded-sm border border-gray-400' />

            <button type='submit' className='bg-emerald-600 text-white p-2 rounded-sm'>{loading ? <Spinner /> : "Signup"}</button>

        </form>

    </div>
    <p className='text-center pt-3'>Already have an Account ? <Link href={'/login'}><span className='text-sky-800'>Login</span></Link></p>
    </>
  )
}

export default Register