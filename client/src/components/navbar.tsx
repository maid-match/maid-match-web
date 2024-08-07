import React from 'react';
import ProfileDropDown from './profiledropdown';

const Navbar: React.FC = () => {
  const user:string = "abhay";
  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">
          <a href="/" className="">
            <img src="/assets/images/maidmatch_logo_upd.jpg" width="150" alt="Logo" />
          </a>
        </div>
        <div className="nav-menu">
          <div>
            <a href="/" className="link">Search Maids</a>
          </div>
          <div>
            <a href="#" className="link">Become a Maid</a>
          </div>
          <div>
            <a href="#" className="link">About Us</a>
          </div>
          {user === "" ? (
            <>
              <div>
                <a href="/signIn" className="link">Sign In</a>
              </div>
              <div>
                <a href="/signUp" className="link">Sign Up</a>
              </div>
            </>
          ) : (
            <ProfileDropDown name="Abhay" />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
