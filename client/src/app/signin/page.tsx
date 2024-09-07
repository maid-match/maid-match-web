import React, { FC } from 'react';
import Navbar from '../components/navbar';

const SignIn: FC = () => {
  return (
    <div>
      <Navbar/>
      <div className="wrapper">
        {/* Form */}
        <form className="form" action="#" method="POST">
          <fieldset className="fldt">
            <div className="form-header">
              <h2>Sign In to MaidMatch</h2>
            </div>

            <div className="form-boxes">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                required
                aria-label="Email"
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
                Login
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
