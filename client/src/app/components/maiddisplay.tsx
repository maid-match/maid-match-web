"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface MaidDisplayProps{
    searchTerm:string
}

function MaidDisplay({searchTerm}:MaidDisplayProps) {
    const [maids,setMaids] = useState([])
    useEffect(()=>{
        const funct = async()=>{
        const {data} = await axios.get(`/api/getmaids/:${searchTerm}`)
        setMaids(data.maids)
        }
        funct()
    },[])
  return (
    <div>
      {maids.map((maid,index)=>(<div key={index}>{maid}</div>))}
    </div>
  )
}

export default MaidDisplay
