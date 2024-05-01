import Post from './Post';
import {
    useQuery,
} from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { MakeRequest } from '../../axios';

import Share from './Share';

const Posts = () => {


    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],

        queryFn: async () => {
            const res = await MakeRequest.get("/posts");
            return res.data;
        }
    })

    return (
        <div className='Posts'>
            <Share/>
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
