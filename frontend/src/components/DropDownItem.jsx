import React from 'react'

function DropDownItem(props) {
  return (

    <li className="dropDownItem">
        {props.img}
        <a>{props.text}</a>
    </li>

  )
}

export default DropDownItem