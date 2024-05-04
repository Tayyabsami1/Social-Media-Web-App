import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Messages.scss';
import mypic from '../assets/mypic.png';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';

const Messages = () => {
    // Simulate a logged-in user (hardcoded user with ID 1 for testing)
    const currentUser = { id: 1 };
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);

    const fetchFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/messages/friends/${currentUser.id}`);
            console.log(response.data)
            setFriends(response.data); // assuming the backend sends an array of friends
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };
    

    const handleFriendClick = (friend) => {
        if (friend && friend.user_id) {
            console.log(`Selected friend ID: ${friend.user_id}`); // Corrected from friend.id to friend.user_id
            setSelectedFriend(friend);
            fetchMessages(friend.user_id); // Assuming you pass the ID to fetch messages
        } else {
            console.log('Friend ID is undefined');
        }
    };
    
    
    

    const fetchMessages = async (friendId) => {
        if (!friendId) {
            console.log('fetchMessages called with undefined friendId');
            return; // Prevent making a call if friendId is undefined
        }
        console.log(`Making API request for messages with friend ID: ${friendId}`);
        try {
            const response = await axios.get(`http://localhost:3000/api/messages/${currentUser.id}/${friendId}`);
            console.log('API Response:', response.data);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    


    useEffect(() => {
        fetchFriends();
        
    }, []);  

    



   //-----------------------------------------------------------

   const handleSendMessage = async () => {
    if (!text.trim() || !selectedFriend) {
        console.log('No text or no friend selected');
        return;
    }
    
    console.log("Attempting to send message:", {
        senderId: currentUser.id,
        receiverId: selectedFriend.user_id,
        content: text
    });

    try {
        const response = await axios.post('http://localhost:3000/api/messages/send', {
            senderId: currentUser.id,
            receiverId: selectedFriend.user_id,
            content: text
        });

        setText('');
        setMessages([...messages, {
            content: text,
            sender_id: currentUser.id,
            sent_at: new Date().toISOString() // This will set the time when the message was added
        }]);

        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data.message : 'Failed to send message');
    }
};

    


    //----------------------------------------------
    return (
        <div className="Chatcontainer">
        <div className="Messages">
    {friends.map(friend => (
        <div key={friend.user_id} className="Message" onClick={() => handleFriendClick(friend)}>
            <img src={friend.profile_picture || mypic}  />
            <div className="userinfo">
                <span>{friend.username}</span>
            </div>
        </div>
    ))}
</div>


<div className="chat">
    {selectedFriend && (
        <>
            <div className="center">
                {messages.map((message, index) => (
                    <div key={index} className={`textMessage ${message.sender_id === currentUser.id ? 'Own' : 'Other'}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className="bottom">
                <EmojiEmotionsIcon onClick={() => setOpen(!open)} />
                {open && <EmojiPicker onEmojiClick={(event, emojiObject) => setText(text + emojiObject.emoji)} />}
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </>
    )}
</div>

    </div>
    );
};

export default Messages;
