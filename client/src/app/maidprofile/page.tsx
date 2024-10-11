"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';

interface MaidProfileProps {
    first_name: string;
    last_name: string;
    number: string;
    email: string;
    pfp: string;
    city: string;
    reviews: string;
    services: string[];
    prices: string[];
    review_string_list: string[];
    reviewer_list: string[];
}

const MaidProfile: React.FC<MaidProfileProps> = (props) => {
  const [showContactBox, setShowContactBox] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowContactBox(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showContactBox]);

  return (
    <>
      <Navbar />
      <div className="bg-white pt-[75px]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <section className="flex items-start mb-8">
            <div className="w-40 h-40 mr-8">
              <img src={props.pfp} alt={`${props.first_name} ${props.last_name}`} className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-1">{`${props.first_name} ${props.last_name[0]}.`}</h1>
              <p className="text-gray-600 mb-2">{props.city}</p>
              <div className="mb-4">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="ml-1 text-gray-600">({props.reviews})</span>
              </div>
              <div className="flex items-center">
                <button className="bg-[#8c52ff] text-white px-6 py-2 rounded-full mr-4" onClick={() => setShowContactBox(true)}>
                  Contact {props.first_name}
                </button>
                <button className="border border-gray-300 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section className="flex mb-8">
            <div className="w-1/3 ">
              <div className="mb-[20px] bg-purple-200 mr-8 p-4 rounded-lg flex space-between">
                <img src="/checkmark.png" className="h-8 w-8" />
                <div className="pl-4 flex items-center">
                  <span className="font-bold text-lg">MaidMatch Certified User</span>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg mr-8">
                <h2 className="text-2xl font-bold mb-4">Services</h2>
                {props.services.map((service, index) => (
                  <div key={index} className="mb-4 flex justify-between">
                    <h3 className="font-semibold">{service}</h3>
                    <p className="text-2xl font-bold">${props.prices[index]}</p>
                  </div>
                ))}
                <a href="#" className="text-blue-600 hover:underline">See Additional Services & Rates</a>
                <p className="text-gray-600 text-sm mt-2">Pick-up & drop-off, bathing / grooming</p>
              </div>
            </div>

            <div className="w-2/3">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {props.review_string_list.map((review, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold">{props.reviewer_list[index]}</span>
                      <span className="text-yellow-400 ml-2">★★★★★</span>
                    </div>
                    <p className="text-gray-600">{review}</p>
                  </div>
                ))}
                <button className="text-blue-600 hover:underline">Read More Reviews</button>
              </div>
            </div>
          </section>
        </div>

        {showContactBox ? (
          <div className="fixed inset-0 flex items-center justify-center p-2">
            <div className="mb-40 flex flex-col w-1/5 rounded-lg shadow-xl bg-gray-100 p-4 items-center" ref={menuRef}>
              <h1 className="mt-6 text-xl font-bold">Contact {props.first_name}</h1>
              <h4 className="mt-4">Phone: {props.number}</h4>
              <h4 className="mt-1 mb-10">Email: {props.email}</h4>
              <button className="bg-[#8c52ff] text-white px-6 py-2 rounded-full" onClick={() => setShowContactBox(false)}>
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MaidProfile;
