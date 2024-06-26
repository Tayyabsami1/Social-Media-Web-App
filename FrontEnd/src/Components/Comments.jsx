import { useContext, useState, useEffect } from 'react'
import '../Css/Comments.scss'
import { AuthContext } from '../Context/AuthContext'
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { MakeRequest } from "../../axios.js"
import toast from 'react-hot-toast'
import moment from "moment"

const Comments = ({ postId, handleCallback }) => {


    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");

    const { isPending, error, data } = useQuery({
        queryKey: [`comments/${postId}`],

        queryFn: async () => {
            const res = await MakeRequest.get(`/comments/${postId}`);
            return res.data;
        }
    })


    isPending ? false : handleCallback(data.length)

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            try {
              const response=  await  MakeRequest.post("/comments", newComment);
              toast.success("Comment posted successful")
            }
            catch (err) {
                toast.error(err.response.data);
                return err;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`comments/${postId}`] })
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
                <img src={"../../public/Uploads/" + currentUser.profile_picture} alt="" />
                <input type="text" value={desc} placeholder='Write a comment' onChange={e => setDesc(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>

            {error ? "Error Occured" : (isPending ? "Loading..." : data.map(comment => (
                <div className="comment" key={comment.comment_id}>

                    <img src={"../../public/Uploads/" + comment.profile_picture} alt="" />

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
