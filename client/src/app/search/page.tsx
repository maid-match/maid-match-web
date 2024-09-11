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
      <div className="wrapper">
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
        <MaidDisplay searchTerm={searchT}></MaidDisplay>
      </div>
    </div>
  );
}

export default Search;
