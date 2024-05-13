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

import mypic from '../assets/mypic.png'

const Navbar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [fetchedUsers, setFetchedUsers] = useState([]); // Fetched user results state

  useEffect(() => {
    // Make API request to fetch users based on search query
    const fetchUsers = async () => { 
      try {
        if (searchQuery.length > 0) {
          const res = await fetch(`http://localhost:3000/api/users/find/${searchQuery}`);
          if (!res.ok) {
            throw new Error('Error fetching users:', res.statusText);
          } else {
            const getdata = await res.json();
            setFetchedUsers(getdata); // Set fetchedUsers to the response data
          }
        } else {
          setFetchedUsers([]); // Reset fetchedUsers if searchQuery is empty
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
        setFetchedUsers([]); // Set fetchedUsers to empty array on error
      }
    }
  
    fetchUsers(); // Call the function on component mount and search query change
  }, [searchQuery]);



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
            value={searchQuery} // Set input value from state
            onChange={(event) => setSearchQuery(event.target.value)} // Update state on change
          />
       {/* Display dropdown list */}
    {fetchedUsers.length > 0 && (
  <ul className="dropdown-list-below"> {/* Updated class name */}
    {fetchedUsers.map((user, index) => (
      <li key={index} style={{ listStyleType: 'none' }}> {/* Set list style to none */}
        <class style={{ color: 'black' }}>{user.username}</class> {/* Set text color to black */}
      </li>
    ))}
  </ul>
)}

          </div>
        </div>

        <div className="right">

          {darkMode ? <WbSunnyOutlinedIcon className='icon' onClick={toggle} /> : <DarkModeOutlinedIcon className='icon' onClick={toggle} />}
          <HomeOutlinedIcon onClick={() => navigate("/")} className='icon' />
          <MailOutlineOutlinedIcon onClick={() => (navigate("/messages"))} className='icon' />
          <LogoutIcon onClick={() => (navigate("/login"))} className='icon'/>

          <div className="user" onClick={() => (navigate(`/profile/${currentUser.user_id}`))}>
            <img src={"../../public/Uploads/"+currentUser.profile_picture} alt="" />
            <span>{currentUser.username}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
