import HomeCards from "@/components/HomeCards";
import Header from "./header/page";
import {cookies} from 'next/headers'
import axios from "axios";


const getHotels= async ()=> {
  try {
    // const cookieStore= cookies()
    // const token= cookieStore.get('token').value
  const response= await axios.get(`${process.env.DOMAIN}/api/hotels`)
  return response.data.data
    
  } catch (error) {
    console.log(error.message)
    
  }
}

export default async function Home() {
  const hotels= await getHotels()
  
  return (
    <>
    <Header />

    <div className="flex flex-wrap mt-3 justify-center">
      {hotels.map((hotel)=> (
           <HomeCards key={hotel._id} hotel={hotel} />
      ))}
   
    </div>
    
    </>
   
  )
}