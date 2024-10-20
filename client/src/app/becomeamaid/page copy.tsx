import React, { FC } from 'react';
import Navbar from '../components/navbar';

const SignUp: FC = () => {
  return (
    <div>
        <Navbar/>
      <div className="wrapper">
        {/* Form */}
        <form className="form" action="#" method="POST">
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
                required
                aria-label="Email"
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="number">Number</label>
              <input
                type="tel"
                id="number"
                placeholder="Number"
                required
                aria-label="Phone Number"
              />
            </div>

            <div className="form-boxes">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                required
                aria-label="Address"
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
