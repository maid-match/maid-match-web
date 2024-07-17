import React from 'react'
import ProfileDropDown from './ProfileDropDown'

function Header() {
  const user = ""
  return (
    <div>
        <nav className="nav">
            <div className="nav-logo">
            <a href="/" className = ""> <img src = "/assets/images/maidmatch_logo_upd.jpg" width="150"/> </a>
                
            </div>
            <div className="nav-menu">
                
                    <div> <a href="/" className = "link"> Search Maids </a> </div>
                    <div> <a href="#" className = "link">  Become a Maid </a> </div>
                    <div>  <a href="#" className = "link"> About Us </a> </div>
                    {user===""?
                    <><div> <a href="/signIn" className = "link"> Sign In </a> </div><div> <a href="/signUp" className = "link"> Sign Up </a> </div></>
                    :
                    <ProfileDropDown/>
                    
                    }
                    
                    
            </div>
          
            
        </nav>
    </div>
  )
}

export default Header