"use client"
import React, { FC, useState } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';
import { redirect } from 'next/navigation';
const SignIn: FC = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {login,user} = useAuth()

  const handleLogin = async(e:React.FormEvent)=>{
    e.preventDefault()
    console.log(user)
    await login(email,password)
    console.log(user)

    

  }
  return (
    <div>
      <Navbar/>
      <div className="wrapper">
        {/* Form */}
        <form  onSubmit = {handleLogin} className="form" action="#" method="POST">
          <fieldset className="fldt">
            <div className="form-header">
              <h2>Sign In to MaidMatch</h2>
            </div>

            <div className="form-boxes">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e)=>{setEmail(e.target.value)}}
                type="text"
                id="email"
                placeholder="Email"
                required
                aria-label="Email"
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password"
                id="password"
                placeholder="Password"
                required
                aria-label="Password"
              />
            </div>

            <div className="btn">
              <button role="button"  className="form-sbmt-btn" type="submit">
                Login
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
