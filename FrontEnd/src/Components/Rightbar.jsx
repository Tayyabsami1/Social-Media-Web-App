import '../Css/Rightbar.scss'
import mypic from '../assets/mypic.png'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext'
import toast from "react-hot-toast"

// const Rightbar = () => {
//     return (
//         <div className='Rightbar'>
//             <div className="container">
//                 <div className="item">
//                     <span>Suggested for you</span>
//                     <div className="user">
//                         <div className="userinfo">
//                             <img src={mypic} alt="" />
//                             <span>Tayyab Sami</span>
//                         </div>
//                         <div className="buttons">
//                             <button>Add Friend</button>
//                             <button>Dismiss</button>
//                         </div>

//                     </div>
//                 </div>
//                 <div className="item">
//                     <span>Your Friends</span>
//                     <div className="user">
//                         <div className="userinfo">
//                             <img src={mypic} alt="" />
//                             <span>Tayyab Sami</span>
//                         </div>

//                     </div>
//                 </div>
//                 <div className="item">
//                     <span>Latest Activities</span>
//                     <div className="user">
//                         <div className="userinfo">
//                             <img src={mypic} alt="" />
//                             <p>
//                                 <span>Tayyab Sami</span> Changed their picture
//                             </p>
//                         </div>
//                         <span>1 min ago </span>
//                     </div>

//                     <div className="user">
//                         <div className="userinfo">
//                             <img src={mypic} alt="" />
//                             <p>
//                                 <span>Tayyab Sami</span> liked a photo
//                             </p>
//                         </div>
//                         <span>1 min ago </span>
//                     </div>

//                     <div className="user">
//                         <div className="userinfo">
//                             <img src={mypic} alt="" />
//                             <p>
//                                 <span>Tayyab Sami</span> liked a comment
//                             </p>
//                         </div>
//                         <span>1 min ago </span>
//                     </div>

//                     <div className="user">
//                         <div className="userinfo">
//                             <img src={mypic} alt="" />
//                             <p>
//                                 <span>Tayyab Sami</span> posted
//                             </p>
//                         </div>
//                         <span>1 min ago </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


const Rightbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [suggestedProfiles, setSuggestedProfiles] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const loggedInUserId = currentUser.user_id;

    useEffect(() => {
        async function fetchSuggestedProfiles() {
            try {
                const response = await fetch(`http://localhost:3000/api/Suggestions/friends-of-friends/${loggedInUserId}`);
                const friendsOfFriends = await response.json();
                if (friendsOfFriends.length > 0) {
                    const profilesResponse = await fetch(`http://localhost:3000/api/Suggestions/profiles/${friendsOfFriends.join(',')}`);
                    const suggestedProfilesData = await profilesResponse.json();
                    setSuggestedProfiles(suggestedProfilesData);
                } else {
                    const usersResponse = await fetch(`http://localhost:3000/api/Suggestions/other-users/${loggedInUserId}`);
                    const otherUsersData = await usersResponse.json();
                    setSuggestedProfiles(otherUsersData);
                }
            } catch (error) {
                console.error('Error fetching suggested profiles:', error);
            }
        }

        fetchSuggestedProfiles();
        async function fetchFriendRequests() {
            try {
                const response = await fetch(`http://localhost:3000/api/FriendsR/friend-requests/${loggedInUserId}`);
                const data = await response.json();
                setFriendRequests(data);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        }

        fetchFriendRequests();

        async function fetchFriends() {
            try {
                const response = await fetch(`http://localhost:3000/api/Friends/friends/${loggedInUserId}`);
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        }

        fetchFriends();
    }, [loggedInUserId]);

    async function handleAddFriend(profileId) {
        try {
            await fetch(`http://localhost:3000/api/Suggestions/send-friend-request/${profileId}/${loggedInUserId}`,
                {
                    method: 'POST',
                });
            toast.success("Friend request sent")
            // Update UI to indicate request sent
            const updatedProfiles = suggestedProfiles.map(profile => {
                if (profile.user_id === profileId) {
                    return { ...profile, requested: true };
                }
                return profile;
            });
            setSuggestedProfiles(updatedProfiles);
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    function handleDismissProfile(profileId) {
        const updatedProfiles = suggestedProfiles.filter(profile => profile.user_id !== profileId);
        setSuggestedProfiles(updatedProfiles);
    }

    async function handleAcceptFriendRequest(requestId) {
        try {
            // Make the POST request to accept the friend request
            await fetch(`http://localhost:3000/api/FriendsR/accept-friend-request/${requestId}/${loggedInUserId}`, {
                method: 'POST',
            });


            // Remove accepted request from UI
            setFriendRequests(prevRequests => prevRequests.filter(request => request.user_id !== requestId));
            toast.success("Friend request Accepted")
            const updatedProfiles = suggestedProfiles.filter(request => request.user_id !== requestId);
            setSuggestedProfiles(updatedProfiles);
            const response = await fetch(`http://localhost:3000/api/Friends/friends/${loggedInUserId}`);
            const data = await response.json();
            setFriends(data);

        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    }


    async function handleDeclineFriendRequest(requestId) {
        try {
            await fetch(`http://localhost:3000/api/FriendsR/decline-friend-request/${requestId}/${loggedInUserId}`, {
                method: 'DELETE',
            });
            // Remove declined request from UI
            setFriendRequests(prevRequests => prevRequests.filter(request => request.user_id !== requestId));
            toast.success("Friend request Declined")
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    }
    return (
        <div className='Rightbar'>
            <div className="container">
                <div className="item">
                    <span>Suggested for you</span>
                    {suggestedProfiles.length === 0 ? (
                        <div className='NoMsg'>No Suggestions</div>
                    ) :
                        (suggestedProfiles.map(profile => (
                            <div key={profile.user_id} className="user">

                                <div className="userinfo">

                                    <img src={"../../public/Uploads/" + profile.profile_picture} alt="" />
                                    <span>{profile.username}</span>
                                </div>

                                <div className="buttons">
                                    {profile.requested ? (
                                        <button>Requested</button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleAddFriend(profile.user_id)}>Add Friend</button>
                                            <button onClick={() => handleDismissProfile(profile.user_id)}>Dismiss</button>
                                        </>
                                    )}
                                </div>
                                
                            </div>
                        )))}
                </div>
                <div className="item">
                    <span>Friend Request List</span>
                    {friendRequests.length === 0 ? (
                        <div className='NoMsg'>No Requests</div>
                    ) : (
                        friendRequests.map(request => (
                            <div key={request.request_id} className="user">
                                <div className="userinfo">
                                    <img src={"../../public/Uploads/" + request.profile_picture} alt="" />
                                    <span>{request.username}</span>
                                </div>
                                <div className="buttons">
                                    <button onClick={() => handleAcceptFriendRequest(request.user_id)}>Accept</button>
                                    <button onClick={() => handleDeclineFriendRequest(request.user_id)}>Decline</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="item">
                    <span>Your Friends</span>
                    {friends.length === 0 ? (
                        <div className='NoMsg'>No Friends</div>
                    ) : (
                        friends.map(friend => (
                            <div key={friend.user_id} className="user">
                                <div className="userinfo">
                                    <img src={"../../public/Uploads/" + friend.profile_picture} alt="" />
                                    <span>{friend.username}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default Rightbar;
