import React, { useState, useEffect, useRef } from 'react'
import DropDownItem from './DropDownItem'

function ProfileDropDown(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  let menuRef = useRef();

  useEffect(()=> {
    const handleOutsideClick = (e)=> {
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setIsOpen(false)
      }
    }


    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  return (

    <div className="menu-container" >
      <div className="menu-trigger link" onClick={toggleDropdown}>
        <p>Hello, {props.name}</p>
      </div>
      
      {isOpen && (
        <div className='dropdown-menu' ref = {menuRef}> 
          <ul> 
            <DropDownItem icon="fa-solid fa-user" text="Profile"/>
            <DropDownItem icon="fa-solid fa-gear" text="Edit Profile"/>
            <DropDownItem icon="fa-solid fa-envelope" text="Inbox"/>
            <DropDownItem icon="fa-solid fa-question" text="Help"/>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown