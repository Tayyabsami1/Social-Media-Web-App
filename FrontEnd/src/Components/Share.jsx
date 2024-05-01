import "../Css/Share.scss";
import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import toast from "react-hot-toast";

import { MakeRequest } from '../../axios';
const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await MakeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };



    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newPost) => {
            return MakeRequest.post("/posts", newPost);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })


    const handleClick = async (e) => {
        if (!desc.length)
            return toast.error("Please write some description");
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ Content: desc, Media_url: imgUrl });
        setDesc("");
        setFile(null);
    };

    return (

        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={"/upload/" + currentUser.profile_picture} alt="" />
                        <input
                            type="text"
                            placeholder={`What's on your mind ${currentUser.username}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => { setFile(e.target.files[0]) }}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
