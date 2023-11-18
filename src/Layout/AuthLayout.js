import { Button } from 'antd'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const [size, setSize] = useState('large'); 
  return (
    <div>
        <div>
            <nav className='flex justify-between bg-[#673AB7] text-white items-center px-12 py-4 '>
                 <h2 className='text-3xl'>ABC E-Commerce Services</h2>
                 <div className='flex'>
                  <Link to="/login" className='bg-[#fff] text-[#673AB7] px-10 py-2 rounded-2xl mr-4 ' >Login</Link>
                  <Link to="/register" className='bg-white text-[#673AB7] px-10 py-2 rounded-2xl ' >Register</Link>
                 </div>
            </nav>
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout