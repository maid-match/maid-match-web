"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface MaidDisplayProps{
    searchTerm:string
}
interface Maid{
  id:string,
  fname:string,
  lname:string,
  location:string,
  phone_number:string,
  email:string
}

function MaidDisplay({searchTerm}:MaidDisplayProps) {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Your backend server URL
});


    const [maids,setMaids] = useState([])
    useEffect(()=>{
        const funct = async()=>{
        const {data} = await axiosInstance.get(`/maids/${searchTerm}`)
        setMaids(data)
        }
        funct()
        console.log(maids)
    },[searchTerm])
  return (
    <div>
      {maids.map((maid:Maid,index)=>(<div key={index}>
            <p><strong>ID:</strong> {maid.id}</p>
            <p><strong>First Name:</strong> {maid.fname}</p>
            <p><strong>Last Name:</strong> {maid.lname}</p>
            <p><strong>Location:</strong> {maid.location}</p>
            <p><strong>Phone Number:</strong> {maid.phone_number}</p>
            <p><strong>Email:</strong> {maid.email}</p>
            <hr />
          </div>))}
    </div>
  )
}

export default MaidDisplay
