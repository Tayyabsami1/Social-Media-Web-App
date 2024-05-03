// import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../Context/darkModeContext';
import { AuthContext } from "../Context/AuthContext"


import '../Css/Navbar.scss'

import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';

import mypic from '../assets/mypic.png'

const Navbar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <>
      <div className="Navbar">

        <div className="left">

          <Link to='/' style={{ textDecoration: "none" }}>
            <span>SocialSparks</span>
          </Link>

          <div className="search">
            <SearchIcon />
            <input type="text" placeholder='Search' />
          </div>
        </div>

        <div className="right">

          {darkMode ? <WbSunnyOutlinedIcon className='icon' onClick={toggle} /> : <DarkModeOutlinedIcon className='icon' onClick={toggle} />}
          <HomeOutlinedIcon onClick={() => navigate("/")} className='icon' />
          <MailOutlineOutlinedIcon onClick={() => (navigate("/messages"))} className='icon' />
          <LogoutIcon onClick={() => (navigate("/login"))} className='icon'/>

          <div className="user" onClick={() => (navigate("/profile"))}>
            <img src={mypic} alt="" />
            <span>{currentUser.username}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
