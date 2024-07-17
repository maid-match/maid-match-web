import React from 'react'

function ProfileDropDown(props) {
  return (
    <div>
       <div className="menu-container">
          <div className="menu-trigger">
              <p>Hello {props.name}</p>
          </div>
       </div>
    </div>
  )
}

export default ProfileDropDown