import Place from "@mui/icons-material/Place";
import Language from "@mui/icons-material/Language";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import MoreVert from "@mui/icons-material/MoreVert";
import Posts from "./Posts"
import toast from "react-hot-toast";
import axios from "axios"
import { useContext, useEffect, useState } from "react";

import { MakeRequest } from '../../axios';
import { AuthContext } from "../Context/AuthContext";

import {
  useQuery, useMutation, useQueryClient
} from '@tanstack/react-query'

import '../Css/Profile.scss'
import { useLocation } from 'react-router-dom';

const Profile = () => {


  const user_id = useLocation().pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ['user'],

    queryFn: async () => {
      try{
      const res = await MakeRequest.get("/users/find/" + user_id);
      return res.data;
      }
      catch(err)
      {
          toast.error(err.message)
      }
    }
  })

  const { isPending: pending, data: frienddata } = useQuery({
    queryKey: ['friends'],

    queryFn: async () => {
      const res = await MakeRequest.get("/Friends/friends/" + user_id);
      return res.data.map(friend => friend.user_id);
    }
  })

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (isFriend) => {
      if (!isFriend)
        return MakeRequest.post(`/FriendsR/accept-friend-request/${user_id}/${currentUser.user_id}`);
      const res=await  MakeRequest.delete(`/FriendsR/${user_id}/${currentUser.user_id}`);
      console.log(res.data.message)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })


  const handleAddFriend = () => {
    mutation.mutate(frienddata.includes(currentUser.user_id))
  }


  return (
    <div className="profile">
      <div className="images">
        <img
          src={data == null ? "" : "../../public/Uploads/" + data.cover_picture}
          alt=""
          className="cover"
        />
        <img
          src={data == null ? "" : "../../public/Uploads/" + data.profile_picture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">

        <div className="uInfo">

          <div className="center">
            <span>{data == null ? "Loading..." : data.username}</span>

            <div className="info">

              <div className="item">
                <Place />
                <span>{data == null ? "Loading" : data.location}</span>
              </div>

              <div className="item">
                <Language />
                <span>English</span>
              </div>

            </div>
            {user_id == currentUser.user_id ? (<button>Update</button>) : <button onClick={handleAddFriend}>{pending ? false : frienddata.includes(currentUser.user_id) ? "Friends" : "Add Friend"}</button>}

          </div>

          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>

        </div>

        <Posts user_id={user_id}/>
      </div>
    </div >
  )
}

export default Profile
