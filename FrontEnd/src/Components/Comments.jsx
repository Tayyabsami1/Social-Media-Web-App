import  { useContext, useState } from 'react'
import '../Css/Comments.scss'
import { AuthContext } from '../Context/AuthContext'
import {useQuery,useQueryClient,useMutation} from "@tanstack/react-query"
import {MakeRequest} from "../../axios.js"
import toast from 'react-hot-toast'
import moment from "moment"

const Comments = ({ postId }) => {


    const { currentUser } = useContext(AuthContext);
    const [desc,setDesc]=useState("");

    const { isPending, error, data } = useQuery({
        queryKey: ['comments'],

        queryFn: async () => {
            const res = await MakeRequest.get(`/comments/${postId}`);
            return res.data;
        }
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return MakeRequest.post("/comments", newComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    const handleClick = async (e) => {
        if (!desc.length)
            return toast.error("Please write some description");
        e.preventDefault();
        mutation.mutate({ Content: desc, post_id: postId });
        setDesc("");
    };


    return (
        <div className='Comments'>
            <div className="write">
                <img src={""} alt="" />
                <input type="text" value={desc} placeholder='Write a comment' onChange={e=>setDesc(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>
            
            { error? "Error Occured" :(isPending?"Loading...": data.map(comment => (
                <div className="comment" key={postId}>

                    <img src={comment.profile_picture} alt="" />

                    <div className="info">
                        <span>{comment.username}</span>
                        <p>{comment.content}</p>
                    </div>

                    <span className='date'>{moment(comment.timestamp).fromNow()} </span>
                </div>

            )))}
        </div>
    )
}

export default Comments
