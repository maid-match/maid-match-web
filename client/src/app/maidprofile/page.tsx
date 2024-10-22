"use client";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import { redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Review {
  user_name: string;
  rating: number;
  text: string;
}

const MaidProfile: React.FC = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  // Redirect to sign-in if the user is not authenticated
  if (user == null) {
    redirect('/signin');
  }

  const id = searchParams.get('id');
  const fname = searchParams.get('fname');
  const lname = searchParams.get('lname');
  const phone_number = searchParams.get('phone_number');
  const email = searchParams.get('email');
  const location = searchParams.get('location');

  

  const [showContactBox, setShowContactBox] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true); // Loading state for reviews
  const [error, setError] = useState(''); // Error state
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pf,setPf] = useState("")
  const [pp,setPp] = useState("")
  const[ps,setPs] = useState("")


  // Fetch reviews when the component loads or reloads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!id) {
          console.log('Maid ID is missing');
          return;
        }

        console.log(`Fetching reviews for maid ID: ${id}`);
        setLoadingReviews(true);
        
        const res = await axios.get(`/api/review/${id}`);
        console.log('Fetched reviews:', res.data);
        let reviews_n: Review[] = []
        for (const r of res.data){
          const { data } = await axios.get(`/api/users/${r.user_id}`);
          const user_name = data[0].fname + " " + data[0].lname;
          const rating = r.reviewno;
          const text = r.reviewtxt;
          reviews_n.push({ user_name, rating, text });
        }
        setReviews(reviews_n);
        setLoadingReviews(false);

        

      } catch (err) {
        console.error('Failed to load reviews:', err);
        setError('Failed to load reviews');
        setLoadingReviews(false);
      }
      try{
        const{data} = await axios.get(`/api/price/${id}`)
        const d=data[0]
        console.log(data)
        const {price_fullhouse,price_partial,price_specific} = d
        setPf(price_fullhouse)
        setPp(price_partial)
        setPs(price_specific)
      }
      catch(err){
        console.error('Failed to load prices:', err);
        setError('Failed to load prices');
      }


    };

    if (id) {
      fetchReviews();
    } else {
      console.log('No maid ID provided');
    }
  }, [id]);

  const submitReview = async () => {
    try {
      const reviewData = {
        maid_id: id,
        user_id: user.id,
        rating: starRating,
        text: reviewText,
      };
      console.log('Submitting review:', reviewData);
      
      const res = await axios.post('/api/reviews', reviewData);

      const newReview = {
        user_name: `${user.fname} ${user.lname}`,
        rating: starRating,
        text: reviewText,
      };

      setReviews((prevReviews) => [...prevReviews, newReview]);

      setReviewText('');
      setStarRating(5);
    } catch (err) {
      console.log('Error submitting review:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white pt-[75px]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <section className="flex items-start mb-8">
            <div className="w-40 h-40 mr-8">
              <img
                src="./maid_imgs/person.jpg"
                alt={`${fname} ${lname}`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-1">{`${fname} ${lname?.[0]}.`}</h1>
              <p className="text-gray-600 mb-2">{location}</p>
              <div className="mb-4">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="ml-1 text-gray-600">(5)</span>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-[#8c52ff] text-white px-6 py-2 rounded-full mr-4"
                  onClick={() => setShowContactBox(true)}
                >
                  Contact {fname}
                </button>
              </div>
              
              {/* Price Section */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Pricing Information:</h3>
                <p><strong>Price Full:</strong> ${pf}</p>
                <p><strong>Price Partial:</strong> ${pp}</p>
                <p><strong>Price Single:</strong> ${ps}</p>
              </div>
            </div>
          </section>

          <div className="flex justify-between">
            <section className="w-[40vw] mb-8">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <div className="space-y-4">
                {loadingReviews ? (
                  <p>Loading reviews...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="text-lg font-semibold">{review.user_name}</h3>
                      <div className="text-yellow-400">
                        {'★'.repeat(review.rating)}{' '}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to leave a review!</p>
                )}
              </div>
            </section>

            <section className="w-[40vw] mb-8">
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
        </div>

        {showContactBox && (
          <div className="fixed inset-0 flex items-center justify-center p-2">
            <div
              className="mb-40 flex flex-col w-1/5 rounded-lg shadow-xl bg-gray-100 p-4 items-center"
              ref={menuRef}
            >
              <h1 className="mt-6 text-xl font-bold">Contact {fname}</h1>
              <h4 className="mt-4">Phone: {phone_number}</h4>
              <h4 className="mt-1 mb-10">Email: {email}</h4>
              <button
                className="bg-[#8c52ff] text-white px-6 py-2 rounded-full"
                onClick={() => setShowContactBox(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MaidProfile;
