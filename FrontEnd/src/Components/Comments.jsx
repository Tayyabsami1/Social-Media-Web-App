import React, { useContext } from 'react'
import '../Css/Comments.scss'
import { AuthContext } from '../Context/AuthContext'
import {useQuery} from "@tanstack/react-query"
import {MakeRequest} from "../../axios.js"

const Comments = ({ postId }) => {


    const { currentUser } = useContext(AuthContext);

    const { isPending, error, data } = useQuery({
        queryKey: ['comments'],

        queryFn: async () => {
            const res = await MakeRequest.get(`/comments/${postId}`);
            return res.data;
        }
    })


    return (
        <div className='Comments'>
            <div className="write">
                <img src={""} alt="" />
                <input type="text" placeholder='Write a comment' />
                <button>Send</button>
            </div>
            
            { error? "Error Occured" :(isPending?"Loading...": data.map(comment => (
                <div className="comment" key={postId}>

                    <img src={comment.profile_picture} alt="" />

                    <div className="info">
                        <span>{comment.username}</span>
                        <p>{comment.content}</p>
                    </div>

                    <span className='date'>{comment.timestamp} </span>
                </div>

            )))}
        </div>
    )
}

export default Comments
