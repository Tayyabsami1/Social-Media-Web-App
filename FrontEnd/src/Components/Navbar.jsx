// import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { DarkModeContext } from '../Context/darkModeContext';
import { AuthContext } from "../Context/AuthContext"
import toast from "react-hot-toast"


import '../Css/Navbar.scss'

import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Navbar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [fetchedUsers, setFetchedUsers] = useState([]); // Fetched user results state
  const [menuOpen,setmenuOpen]=useState(false);

  useEffect(() => {
    // Make API request to fetch users based on search query
    const fetchUsers = async () => {
      try {
        if (searchQuery.length > 0) {
          const res = await fetch(`${import.meta.env.VITE_Backend_Url}/api/users/search/${searchQuery}`);
          const getdata = await res.json();
          if (getdata.length < 1) {
            setTimeout(() => {
              toast.error("This user doesnot exist in the System")
            }, 2000);

          }
          setFetchedUsers(getdata);
        }
        else{
          setFetchedUsers([]);
        }
      }
      catch (error) {
        setFetchedUsers([]); // Reset fetchedUsers if searchQuery is empty
      }
    }

    fetchUsers(); 
  }, [searchQuery]);

  const toggleMenu = () => {
      setmenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="Navbar">

        <div className="left">

          <Link to='/' style={{ textDecoration: "none" }}>
            <span>SocialSparks</span>
          </Link>

          <div className="search">
            <SearchIcon />
            <input
              type="text"
              placeholder='Search'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />

            {/* Javascript code for fetch query */}
            {fetchedUsers.length > 0 && (
              <ul className="dropdown-list-below">
                {fetchedUsers.map((user, index) => (

                  <Link to={`/Profile/${user.user_id}`} key={index}>
                  <li   className='list-item' >
                    {user.username}
                  </li>
                  </Link>
                ))}
              </ul>
            )}

          </div>

        </div>

        <div className="right">
            <div className="myicons">
          {darkMode ? <WbSunnyOutlinedIcon className='icon' onClick={toggle} /> : <DarkModeOutlinedIcon className='icon' onClick={toggle} />}
          <HomeOutlinedIcon onClick={() => navigate("/")} className='icon' />
          <MailOutlineOutlinedIcon onClick={() => (navigate("/messages"))} className='icon' />
          <LogoutIcon onClick={() => (navigate("/login"))} className='icon' />

          <div className="user" onClick={() => (navigate(`/profile/${currentUser.user_id}`))}>
            <img src={"../../public/Uploads/" + currentUser.profile_picture} alt="" />
            <span>{currentUser.username}</span>
          </div>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
         {menuOpen?<MenuOpenIcon/>:<MenuIcon/> }  
         {menuOpen && 
            <div className='menu'>
            {darkMode ? <WbSunnyOutlinedIcon className='icon' onClick={toggle} /> : <DarkModeOutlinedIcon className='icon' onClick={toggle} />}
          <HomeOutlinedIcon onClick={() => navigate("/")} className='icon' />
          <MailOutlineOutlinedIcon onClick={() => (navigate("/messages"))} className='icon' />
          <LogoutIcon onClick={() => (navigate("/login"))} className='icon' />
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
