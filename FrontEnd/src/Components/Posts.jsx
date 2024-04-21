import React from 'react'
import Post from './Post';

const Posts = () => {
    const posts = [{
        id: 1,
        name: "Tayyab Kamran ",
        userId: 1,
        profilePic: "https://w0.peakpx.com/wallpaper/1014/995/HD-wallpaper-hood-black-grey-man-random-white.jpg",
        desc: "Hi i am a cool looking boy with some bad sense of fashion making, i make scenarios about the girls that i have 0 chances with , some of the girls i like are Tiana Kaeer , Madison Bear , Dasha Taran , Mickey Bobby brown , Eva Helfie (dont search her up )",

    },
    {
        id: 1,
        name: "Tayyab Kamran ",
        userId: 1,
        profilePic: "https://w0.peakpx.com/wallpaper/1014/995/HD-wallpaper-hood-black-grey-man-random-white.jpg",
        desc: "Hi i am a cool looking boy with some bad sense of fashion making, i make scenarios about the girls that i have 0 chances with , some of the girls i like are Tiana Kaeer , Madison Bear , Dasha Taran , Mickey Bobby brown , Eva Helfie (dont search her up )",

    }];
    return (
        <div className='Posts'>
            {
                posts.map(post=>(
                    <Post post={post} key={post.id}/>
                ))
            }
        </div>
    )
}

export default Posts
