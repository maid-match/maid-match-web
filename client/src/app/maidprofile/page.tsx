"use client";
import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import Navbar from '../components/navbar';

interface MaidProfileProps {
    first_name: string;
    last_name: string;
    pfp: string;
    city: string;
    reviews: string;
    services: string[];
    prices: string[];
    review_string_list: string[];
    reviewer_list: string[];
}

const MaidProfile: React.FC<MaidProfileProps> = (props) => {
  return (
    <div className="bg-white">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="flex items-start mb-8">
          <div className="w-40 h-40 mr-8">
            <img src={props.pfp} alt={`${props.first_name} ${props.last_name}`} className="w-full h-full rounded-full object-cover"/>
          </div>

          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-1">{`${props.first_name} ${props.last_name[0]}.`}</h1>
            <p className="text-gray-600 mb-2">{props.city}</p>
            <div className="mb-4">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="ml-1 text-gray-600">({props.reviews})</span>
                <span className="ml-4 text-gray-600">Response Rate: 80%</span>
                <span className="ml-4 text-gray-600">Response Time: within a few hours</span>
            </div>
            <div className="flex items-center">
                <button className="bg-green-600 text-white px-6 py-2 rounded-full mr-4">Contact {props.first_name}</button>
                <button className="border border-gray-300 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
            </div>
          </div>
        </section>

        <section className="flex mb-8">
          <div className="w-1/3 bg-gray-100 p-6 rounded-lg mr-8">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            {props.services.map((service, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{service}</h3>
                <div className="flex justify-between">
                  <p className="text-2xl font-bold">${props.prices[index]}</p>
                  <p className="text-gray-600">{index === 0 ? 'per night' : 'per day'}</p>
                </div>
                <p className="text-gray-600 text-sm">in the sitter's home</p>
              </div>
            ))}
            <a href="#" className="text-blue-600 hover:underline">See Additional Services & Rates</a>
            <p className="text-gray-600 text-sm mt-2">Pick-up & drop-off, bathing / grooming</p>
          </div>

          <div className="w-2/3">
            <div className="grid grid-cols-3 gap-4">
              <img src="main-photo.jpg" alt="Main photo" className="col-span-2 row-span-2 rounded-lg object-cover w-full h-full" />
              {[...Array(4)].map((_, i) => (
                <img key={i} src={`photo-${i+1}.jpg`} alt={`Photo ${i+1}`} className="rounded-lg object-cover w-full h-full" />
              ))}
            </div>
            <p className="mt-4 text-gray-600">{props.first_name} is using the Rover app to track activity and send Rover Cards</p>
          </div>
        </section>

        <section className="flex justify-end">
          <div className="bg-green-100 p-4 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <span className="font-bold text-lg">100%</span>
              <p className="text-sm">of clients received photo updates</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MaidProfile;