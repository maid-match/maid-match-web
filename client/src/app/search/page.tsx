'use client'
import Navbar from '@/app/components/navbar';
import React from 'react';
import MaidDisplay from '../components/maiddisplay';
import { useState } from 'react';

const Search: React.FC = () => {
  const [searchT,setSearchT] = useState("")
  return (
    
    <div>
        <Navbar/>
      <div className="flex flex-col justify-center overflow-y-auto-auto ">
        {/* Search */}
        <div className="search">
          
          <div className="search-head">
            <p>Search for Maids Near You!</p>
          </div>

          <div className="search-bar">
            <input 
            onChange={(e)=>{setSearchT(e.target.value)}}
              type="text" 
              name="Search" 
              id="search-bar" 
              placeholder="Search by name or zip code" 
            />
          </div>

        </div>

        <div className="flex flex-col justify-center items-center w-100">
          <MaidDisplay searchTerm={searchT}></MaidDisplay>
        </div>
          
      </div>
    </div>
  );
}

export default Search;
