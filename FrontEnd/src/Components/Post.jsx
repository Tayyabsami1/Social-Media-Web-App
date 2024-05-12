import '../Css/Post.scss'
import Comments from './Comments'

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHoriz, ShareOutlined, TextsmsOutlined } from '@mui/icons-material'

import { MakeRequest } from '../../axios';
import {
    useQuery, useMutation, useQueryClient
} from '@tanstack/react-query'

import { AuthContext } from '../Context/AuthContext'

const Post = ({ post }) => {

    const [CommentsOpen, setCommentsOpen] = useState(false);
    const [CommentCount, setCommentCount] = useState("");

    const handleCallback=(data)=>{
        setCommentCount(data);
    }

    const { currentUser } = useContext(AuthContext);
    

    const { isPending, error, data } = useQuery({
        queryKey: [`likes/${post.post_id}`],

        queryFn: async () => {
            const res = await MakeRequest.get("/likes?post_id=" + post.post_id);
            return res.data.map(like => like.user_id);
        }
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (isliked) => {
            if (!isliked)
                return MakeRequest.post("/likes", { post_id: post.post_id });
            return MakeRequest.delete("/likes/"+ post.post_id );
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [`likes/${post.post_id}`] })
        },
    })

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.user_id))
    }


    return (
        <div className="post">
            <div className="container">

                <div className="user">

                    <div className="userinfo">
                        <img src={"../../public/Uploads/"+post.profile_picture} alt="" />

                        <div className="details">
                            <Link to={`/Profile/${post.user_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className='name'>{post.username}</span>
                            </Link>
                            <span className='date'>{moment(post.timestamp).fromNow()}</span>
                        </div>

                    </div>

                    <MoreHoriz />
                </div>

                <div className="content">
                    <p>{post.content}</p>
                    <img src={"../../public/Uploads/" + post.media_url} alt="" />
                </div>

                <div className="info">

                    <div className="item">
                        {isPending ? "Loading..." : data.includes(currentUser.user_id) ? <FavoriteOutlined style={{ color: "red" }} onClick={handleLike} /> : <FavoriteBorderOutlined onClick={handleLike} />}
                        <span>{error ? "Error please reload" : isPending ? "Loading" : data.length} Likes</span>
                    </div>

                    <div className="item">
                        <TextsmsOutlined onClick={() => setCommentsOpen(!CommentsOpen)} />
                        <span>{CommentCount} Comments</span>
                    </div>

                    <div className="item">
                        <ShareOutlined />
                        <span>Share</span>
                    </div>
                </div>
                {CommentsOpen && <Comments handleCallback={handleCallback} postId={post.post_id} />}
            </div>
        </div>
    )
}

export default Post
