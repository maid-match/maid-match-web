"use client";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import { redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

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

const MaidProfile: React.FC = () => {
  const searchParams = useSearchParams();
  //REPLACE
  const {user} = useAuth();
  if (user==null){
    redirect('/signin')
  }
  //REPLACE

  const id = searchParams.get('id');
  const fname = searchParams.get('fname');
  const lname = searchParams.get('lname');
  const phone_number = searchParams.get('phone_number');
  const email = searchParams.get('email');
  const location = searchParams.get('location');

  const [showContactBox, setShowContactBox] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(5);
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

  const submitReview = async() => {
    // Function to handle review submission (to be implemented)
    console.log(`Review Text: ${reviewText}, Star Rating: ${starRating}`);
    const d = {"maid_id":id,"user_id":user.id,"rating":starRating,"text":reviewText}
    const res = await axios.post('/api/reviews',d)
    console.log(res);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white pt-[75px]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <section className="flex items-start mb-8">
            <div className="w-40 h-40 mr-8">
              <img src="/default-profile.png" alt={`${fname} ${lname}`} className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-1">{`${fname} ${lname?.[0]}.`}</h1>
              <p className="text-gray-600 mb-2">{location}</p>
              <div className="mb-4">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="ml-1 text-gray-600">(5)</span> {/* Example: reviews count */}
              </div>
              <div className="flex items-center">
                <button className="bg-[#8c52ff] text-white px-6 py-2 rounded-full mr-4" onClick={() => setShowContactBox(true)}>
                  Contact {fname}
                </button>
              </div>
            </div>
          </section>

          {/* Review form section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitReview();
              }}
              className="flex flex-col space-y-4"
            >
              <label htmlFor="reviewText" className="text-lg font-semibold">
                Your Review:
              </label>
              <textarea
                id="reviewText"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="border rounded-lg p-2"
                placeholder="Write your review here"
              ></textarea>

              <label htmlFor="starRating" className="text-lg font-semibold">
                Star Rating:
              </label>
              <select
                id="starRating"
                value={starRating}
                onChange={(e) => setStarRating(Number(e.target.value))}
                className="border rounded-lg p-2"
              >
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? 's' : ''}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-[#8c52ff] text-white px-6 py-2 rounded-full mt-4"
              >
                Submit Review
              </button>
            </form>
          </section>

        </div>

        {showContactBox ? (
          <div className="fixed inset-0 flex items-center justify-center p-2">
            <div className="mb-40 flex flex-col w-1/5 rounded-lg shadow-xl bg-gray-100 p-4 items-center" ref={menuRef}>
              <h1 className="mt-6 text-xl font-bold">Contact {fname}</h1>
              <h4 className="mt-4">Phone: {phone_number}</h4>
              <h4 className="mt-1 mb-10">Email: {email}</h4>
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
