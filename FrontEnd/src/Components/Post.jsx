import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import '../Css/Post.scss'
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHoriz, ShareOutlined, TextsmsOutlined } from '@mui/icons-material'
import Comments from './Comments'
const Post = ({ post }) => {

    const [CommentsOpen, setCommentsOpen] = useState(false);

    const postLiked = false;
    return (
        <div className="post">
            <div className="container">

                <div className="user">

                    <div className="userinfo">
                        <img src={post.profile_picture} alt="" />

                        <div className="details">
                            <Link to={`/Profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className='name'>{post.username}</span>
                            </Link>
                            <span className='date'>{moment(post.timestamp).fromNow()}</span>
                        </div>

                    </div>

                    <MoreHoriz />
                </div>

                <div className="content">
                    <p>{post.content}</p>
                    <img src={"../../public/Uploads/"+post.media_url} alt="" />
                </div>

                <div className="info">

                    <div className="item">
                        {postLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
                        <span>69 Likes</span>
                    </div>

                    <div className="item">
                        <TextsmsOutlined onClick={() => setCommentsOpen(!CommentsOpen)} />
                        <span>69 Comments</span>
                    </div>

                    <div className="item">
                        <ShareOutlined />
                        <span>Share</span>
                    </div>
                </div>
                {CommentsOpen && <Comments postId={post.post_id}/>}
            </div>
        </div>
    )
}

export default Post
