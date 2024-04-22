import React, { useContext } from 'react'
import '../Css/Comments.scss'
import{ AuthContext} from '../Context/AuthContext'

const Comments = () => {

    const {currentUser}=useContext(AuthContext);
    {console.log(currentUser)}
    const comments = [
        {
            id: 1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "John Doe",
            userId: 1,
            profilePicture:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "Jane Doe",
            userId: 2,
            profilePicture:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
    ];

    return (
        <div className='Comments'>
            <div className="write">
                <img src={comments[0].profilePicture} alt="" />
                <input type="text" placeholder='Write a comment' />
                <button>Send</button>
            </div>
            {comments.map(comment=>(
                <div className="comment">

                    <img src={comment.profilePicture} alt="" />

                    <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                    </div>

                    <span className='date'>1 hr ago </span>
                </div>

            ))}
        </div>
    )
}

export default Comments
