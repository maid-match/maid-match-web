"use client"
import React, { FC, useState } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';

const SignUp: FC = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users', {
        fname,
        lname,
        email,
        location,
        password
      });
      console.log('Response:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        {/* Form */}
        <form className="form" onSubmit={handleSubmit} action="#" method="POST">
          <fieldset className="fldt">
            <div className="form-header">
              <h2>Sign Up for MaidMatch</h2>
            </div>

            <div className="form-name">
              <div className="name-group1">
                <label htmlFor="first">First Name</label>
                <input
                  type="text"
                  id="first"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  aria-label="First Name"
                />
              </div>
              <div className="name-group2">
                <label htmlFor="last">Last Name</label>
                <input
                  type="text"
                  id="last"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                  aria-label="Last Name"
                />
              </div>
            </div>

            <div className="form-boxes">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                aria-label="Location"
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
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

export default SignUp;
