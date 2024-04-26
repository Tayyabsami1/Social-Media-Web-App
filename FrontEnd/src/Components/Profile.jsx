import React from 'react'
import Place from "@mui/icons-material/Place";
import Language from "@mui/icons-material/Language";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import MoreVert from "@mui/icons-material/MoreVert";
import Posts from "./Posts"
import '../Css/Profile.scss'

const Profile = () => {
  return (
    <div className="profile">
    <div className="images">
      <img
        src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        className="cover"
      />
      <img
        src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt=""
        className="profilePic"
      />
    </div>
    <div className="profileContainer">

      <div className="uInfo">

        <div className="center">
          <span>Abdul Ahad </span>

          <div className="info">

            <div className="item">
              <Place/>
              <span>USA</span>
            </div>

            <div className="item">
              <Language />
              <span>English</span>
            </div>

          </div>

          <button>follow</button>
        </div>

        <div className="right">
          <EmailOutlined />
          <MoreVert />
        </div>
        
      </div>

    <Posts/>
    </div>
  </div>
  )
}

export default Profile
