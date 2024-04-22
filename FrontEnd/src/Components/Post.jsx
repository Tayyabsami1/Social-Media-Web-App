import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Css/Post.scss'
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHoriz, ShareOutlined, TextsmsOutlined } from '@mui/icons-material'
import Comments from './Comments'
const Post = ({ post }) => {

    const [CommentsOpen, setCommentsOpen]=useState(false);
    const postLiked = false;
    return (
        <div className="post">
            <div className="container">

                <div className="user">

                    <div className="userinfo">
                        <img src={post.profilePic} alt="" />

                        <div className="details">
                            <Link to={`/Profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>1 min ago </span>
                        </div>

                    </div>

                    <MoreHoriz />
                </div>

                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.profilePic} alt="" />
                </div>

                <div className="info">

                    <div className="item">
                        {postLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
                        <span>69 Likes</span>
                    </div>

                    <div className="item">
                        <TextsmsOutlined onClick={()=>setCommentsOpen(!CommentsOpen)}/>
                        <span>69 Comments</span>
                    </div>

                    <div className="item">
                        <ShareOutlined/>
                        <span>Share</span>
                    </div>
                </div>
           {CommentsOpen&&<Comments/>}
            </div>
        </div>
    )
}

export default Post
