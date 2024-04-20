import React from 'react'
import '../Css/Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import  mypic from '../assets/mypic.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <HomeOutlinedIcon/>
        <Person2OutlinedIcon/>
        <MailOutlineOutlinedIcon/>
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
