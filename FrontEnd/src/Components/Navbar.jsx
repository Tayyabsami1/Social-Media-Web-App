import React from 'react'
import { useContext } from 'react';
import '../Css/Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import  mypic from '../assets/mypic.png'
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Context/darkModeContext';

const Navbar = () => {

  const {toggle,darkMode}= useContext(DarkModeContext);
  const navigate = useNavigate();
  return (
    <>
    <div className="Navbar">

      <div className="left">

        <Link to='/' style={{textDecoration:"none"}}>
        <span>SocialSparks</span>
        </Link>

        <div className="search">
            <SearchIcon/>
            <input type="text"  placeholder='Search'/>
        </div>
      </div>

      <div className="right">

       {darkMode ?<WbSunnyOutlinedIcon className='icon' onClick={toggle}/>: <DarkModeOutlinedIcon className='icon' onClick={toggle}/> } 
        <HomeOutlinedIcon onClick={()=> navigate("/")} className='icon'/>
        <Person2OutlinedIcon className='icon'/>
        <MailOutlineOutlinedIcon onClick={()=>( navigate("/messages"))}  className='icon'/>

        <div className="user">
          <img src={mypic} alt="" />
          <span>Tayyab Sami</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
