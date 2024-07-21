import React from 'react'

function DropDownItem({ icon, text }) {
  return (
    <li className="dropdown-item">
      <i className={icon}></i>
      <a>{text}</a>
    </li>
  )
}

export default DropDownItem