import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Posts.scss'
import { MoreHoriz } from '@mui/icons-material'
const Post = ({post}) => {

    return(
        <div className="post">

            <div className="user">
        <div className="userinfo">
            <img src={post.profilePic} alt="" />

            <div className="details">
                <Link to={`/Profile/${post.userId}`} style={{textDecoration:"none",color:"inherit"}}>
                    <span>{post.name}</span>
                    <span className='date'>1 min ago </span>
                </Link>
            </div>
        </div>
        <MoreHoriz/>
            </div>

            <div className="content">

            </div>

            <div className="info">

            </div>

        </div>
    )
}

export default Post
