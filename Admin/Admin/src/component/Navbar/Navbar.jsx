/* eslint-disable no-unused-vars */
import React from 'react'
import "./Navbar.css"
import userlogo from '../../assets/dark-user.png'
const Navbar = () => {
  return (
    <div className='navbar' >
        <h2 className='nav-logo'>AKSHAY SWEETS</h2>
        <img width="30px" className='nav-profile' src={userlogo} alt="" />
    </div>
  )
}

export default Navbar