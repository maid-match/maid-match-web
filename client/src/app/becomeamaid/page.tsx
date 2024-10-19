"use client"
import React, { FC, useState } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';

const BecomeAMaid: FC = () => {
  // State variables to store form data
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  // State variables for price sliders
  const [priceFull, setPriceFull] = useState(100); // Full price slider
  const [pricePartial, setPricePartial] = useState(50); // Partial price slider
  const [priceSingle, setPriceSingle] = useState(25); // Single price slider

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      

      
      const {data} = await axios.post('/api/users',{fname,lname,location,email,password})
      console.log(data)
      const {user_id} = data

      const response = await axios.post('/api/maids', {
        user_id,
        fname,
        lname,
        location,
        number,
        email,
        pf: priceFull,     // Price Full
        pp: pricePartial,  // Price Partial
        ps: priceSingle,   // Price Single
      });
      console.log(response)
      // Handle success (e.g., redirect, show success message)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        {/* Form */}
        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="fldt">
            <div className="form-header">
              <h2>Sign Up as a Maid</h2>
            </div>

            <div className="form-name">
              <div className="name-group1">
                <label htmlFor="first">First Name</label>
                <input
                  type="text"
                  id="first"
                  placeholder="First Name"
                  required
                  aria-label="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="name-group2">
                <label htmlFor="last">Last Name</label>
                <input
                  type="text"
                  id="last"
                  placeholder="Last Name"
                  required
                  aria-label="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            <div className="form-boxes">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="number">Number</label>
              <input
                type="tel"
                id="number"
                placeholder="Phone Number"
                required
                aria-label="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="address">Location</label>
              <input
                type="text"
                id="address"
                placeholder="Location"
                required
                aria-label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sliders for Prices */}
            <div className="form-boxes">
              <label htmlFor="priceFull">Price Full: {priceFull}</label>
              <input
                type="range"
                id="priceFull"
                min="0"
                max="500"
                step="10"
                value={priceFull}
                onChange={(e) => setPriceFull(Number(e.target.value))}
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="pricePartial">Price Partial: {pricePartial}</label>
              <input
                type="range"
                id="pricePartial"
                min="0"
                max="300"
                step="5"
                value={pricePartial}
                onChange={(e) => setPricePartial(Number(e.target.value))}
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="priceSingle">Price Single: {priceSingle}</label>
              <input
                type="range"
                id="priceSingle"
                min="0"
                max="150"
                step="1"
                value={priceSingle}
                onChange={(e) => setPriceSingle(Number(e.target.value))}
              />
            </div>

            <div className="btn">
              <button role="button" className="form-sbmt-btn" type="submit">
                Register!
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default BecomeAMaid;
