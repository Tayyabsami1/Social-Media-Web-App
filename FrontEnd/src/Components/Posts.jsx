import Post from './Post';
import {
    useQuery,
} from '@tanstack/react-query'

import { MakeRequest } from '../../axios';

import Share from './Share';

const Posts = () => {


    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],

        queryFn: async () => {
            const res = await MakeRequest.get("/posts");
            console.log(res)
            return res.data;
        }
    })

    return (
        <div className='Posts'>
            <Share />
            {
                error ? <h3>Something went Wrong</h3> : (
                    isPending ? <h3>Loading Posts...</h3> :
                        data.map(post => (
                            <Post post={post} key={post.post_id} />
                        ))
                )
            }
        </div>
    )
}

export default Posts
