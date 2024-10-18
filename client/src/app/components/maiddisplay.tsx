"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '../axiosInstance';
interface MaidDisplayProps {
  searchTerm: string;
}
interface Maid {
  id: string;
  fname: string;
  lname: string;
  location: string;
  phone_number: string;
  email: string;
  services: string[];
  prices: string[];
}

function MaidDisplay({ searchTerm }: MaidDisplayProps) {

  const [maids, setMaids] = useState<Maid[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get(`/maids/${searchTerm}`);
      setMaids(data);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-4">
      {maids.length === 0 ? (
        <p className="text-center text-gray-500">
          No maids found for "{searchTerm}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {maids.map((maid: Maid, index) => (
            <Link 
              key={index} 
              href={{
                pathname: '/maidprofile',
                query: { 
                  id: maid.id,
                  fname: maid.fname,
                  lname: maid.lname,
                  location: maid.location,
                  phone_number: maid.phone_number,
                  email: maid.email
                }
              }}
            >
              <button
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src="./maid_imgs/kwame.jpg"
                    alt={`${maid.fname} ${maid.lname}`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {maid.fname} {maid.lname}
                  </h2>
                  <p className="text-gray-600">{maid.location}</p>
                </div>

                <hr className="my-4" />

                <div className="space-y-4">
                  {/* {maid.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">{service}</h3>
                      <p className="text-xl font-bold text-[#8c52ff]">
                        ${maid.prices[index]}
                      </p>
                    </div>
                  ))} */}
                </div>
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MaidDisplay;
