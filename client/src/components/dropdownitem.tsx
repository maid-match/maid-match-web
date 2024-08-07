import React from 'react';

interface DropDownItemProps {
  icon: string;
  text: string;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ icon, text }) => {
  return (
    <li className="dropdown-item">
      <i className={icon}></i>
      <a>{text}</a>
    </li>
  );
};

export default DropDownItem;
