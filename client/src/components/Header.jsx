import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='sticky top-0 bg-[#0B3D26] md:hidden flex justify-center items-center z-60 py-2'>
      <Link to={"/"}>
        <img src={logo} className='w-[8rem]'/>
      </Link>
    </div>
  )
}

export default Header
