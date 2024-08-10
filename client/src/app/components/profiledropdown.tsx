"use client";
import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import DropDownItem from './dropdownitem';

<style>
  {`
    .link:hover, .link.active {
      border-bottom: 2px solid #8c52ff;
    }
  `}
</style>

interface ProfileDropDownProps {
  name: string;
}


const ProfileDropDown: React.FC<ProfileDropDownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="menu-container">
      <div className="menu-trigger link no-underline font-medium text-lg text-[#8c52ff] pb-[1px]" onClick={toggleDropdown}>
        <p>Hello, {props.name}</p>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu" ref={menuRef}> 
          <ul> 
            <DropDownItem icon="fa-solid fa-user" text="Profile"/>
            <DropDownItem icon="fa-solid fa-gear" text="Edit Profile"/>
            <DropDownItem icon="fa-solid fa-envelope" text="Inbox"/>
            <DropDownItem icon="fa-solid fa-question" text="Help"/>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
