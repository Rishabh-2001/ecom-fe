import React from 'react'
import bgimg from '../assets/header-40.png'
import { Button } from 'antd'
const Home = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center '>
       <div className='bg-gray-200 w-[60%] mx-auto px-12 py-8 text-center'>
          <p className='text-4xl font-medium  text-center'>
             Welcome to ABC Ecommerce App !
            </p>
            <button className='bg-blue-600 px-8 py-3 rounded-xl text-xl text-white my-4'>Let's enter the Mall ..!</button>
            <div className='w-full h-fit mt-6'>
            <img  src={bgimg} className='max-h-[100%] max-w-[100%] block ' />
            </div>
       </div>
    </div>
  )
}

export default Home