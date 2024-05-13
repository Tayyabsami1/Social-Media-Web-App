import Post from './Post';
import {
    useQuery,
} from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { MakeRequest } from '../../axios';

import Share from './Share';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Posts = ({ user_id }) => {

    const { currentUser } = useContext(AuthContext);
    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],

        queryFn: async () => {
            const res = await MakeRequest.get("/posts?user_id=" + user_id);
            return res.data;
        }
    })

    return (
        <div className='Posts'>
            {user_id? user_id===currentUser.user_id?  <Share />: <></> :   <Share />}
          
            {
                error ? (
                    toast.error("An Error occured. Try to Login again")
                ) : (
                    isPending ? (
                        toast.loading("Loading Posts")
                    ) : (
                        <>
                            {data.map((post) => (
                                <Post post={post} key={post.post_id} />
                            ))}
                            {toast.dismiss()}
                        </>
                    )
                )
            }

        </div>
    )
}

export default Posts
