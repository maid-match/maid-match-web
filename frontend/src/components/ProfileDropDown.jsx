import React from 'react'
import DropDownItem from './DropDownItem'

function ProfileDropDown(props) {
  return (
    <div>
       <div className="menu-container">
          <div className="menu-trigger">
              <p>Hello, {props.name}</p>
          </div>

          <div className='dropdown-menu'> 
              <ul> 
                <DropDownItem img={<i class="fa-solid fa-user"></i>} text={"Profile"}/>
                <DropDownItem img={<i class="fa-solid fa-gear"></i>} text={"Edit Profile"}/>
                <DropDownItem img={<i class="fa-solid fa-envelope"></i>} text={"Inbox"}/>
                <DropDownItem img={<i class="fa-solid fa-question"></i>} text={"Help"}/>
              </ul>
          </div>
       </div>
    </div>
  )
}

export default ProfileDropDown