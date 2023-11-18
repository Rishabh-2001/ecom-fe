import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../redux/auth.slice'

const Register = () => {
    const dispatch=useDispatch()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cnf_password: "",
        userType:"CUSTOMER"
      });
    
      const handleChange = (e) => {
        // e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        if (formData.password !== formData.cnf_password) {
          toast.error("Passwords doesn't match !");
        } else {
          const res =  await dispatch(registerUser(formData));
          console.log("RES:", res);
          if (res.error) {
            toast.error(res.payload);
          }
          else{
            toast.success("User added sucessfuly");
          }
        }
      };
     

  return (
    <div className="flex items-center justify-center py-8   ">
    <div className="flex md:flex-row flex-col  md:w-[60%] w-[90%]  mx-auto justify-between  ">
      <div className="flex-col md:w-[60%] w-[90%] rounded border-2 border-[#673AB7]  text-center py-4">
        <form onSubmit={handleSubmit}>
          <h2 className=" md:text-2xl text-xl font-bold mx-auto text-[#673AB7]">
            Create Your Vendor Account
          </h2>
          <div className="flex-col  text-left mt-8">
            <div className="px-8 mb-6">
              <label htmlFor="firstName" className=" labels mb-2">
                Enter First Name
              </label>
              <br></br>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={FormData.firstName}
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="lastName" className=" labels mb-2">
                Enter Last Name
              </label>
              <br></br>
              <input
                type="text"
                id="lastName"
                onChange={handleChange}
                name="lastName"
                value={FormData.lastName}
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="email" className=" labels mb-2">
                Enter Email
              </label>
              <br></br>
              <input
                type="email"
                name="email"
                value={FormData.email}
                id="email"
                onChange={handleChange}
                className="border w-full py-2 outline-none  p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="password" className="labels mb-2">
                Enter Password
              </label>
              <br></br>
              <input
                type="password"
                name="password"
                id="password"
                value={FormData.password}
                onChange={handleChange}
                className="border w-full py-2 outline-none p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <label htmlFor="cnf_password" className="labelsmb-2">
                Enter Confirm Password
              </label>
              <br></br>
              <input
                type="password"
                name="cnf_password"
                value={FormData.cnf_password}
                id="cnf_password"
                onChange={handleChange}
                className="border w-full py-2 outline-none p-2"
              />
            </div>
            <div className="px-8 mb-6">
              <button className="text-white bg-[#673AB7] w-full py-2 mt-4  rounded-xl">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
     
    </div>
  
  </div>
  )
}

export default Register