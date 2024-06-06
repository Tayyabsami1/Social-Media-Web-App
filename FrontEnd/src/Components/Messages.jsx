import  { useContext,useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Messages.scss';
import mypic from '../assets/mypic.png';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';


const Messages = () => {

    // const currentUser = { id: 1 };
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const {currentUser}=useContext(AuthContext);

    // This doesnot have the id please check line number 133


    const fetchFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/messages/friends/${currentUser.user_id}`);
            console.log(response.data)
            setFriends(response.data); 
        } catch (error) {
            toast.error('Error fetching friends:', error);
        }
    };
    

    const handleFriendClick = (friend) => {
        if (friend && friend.user_id) {
            console.log(`Selected friend ID: ${friend.user_id}`); // Corrected from friend.id to friend.user_id
            setSelectedFriend(friend);
            fetchMessages(friend.user_id); // Assuming you pass the ID to fetch messages
        } else {
            toast.error('Friend ID is undefined');
        }
    };
    
    
    

    const fetchMessages = async (friendId) => {
        if (!friendId) {
            toast.error('Please select a friend');
            return; 
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/messages/${currentUser.user_id}/${friendId}`);
            console.log('API Response:', response.data);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    


    useEffect(() => {
        fetchFriends();
        
    }, [currentUser]);  

    
   const handleSendMessage = async () => {
    if (!text.trim() || !selectedFriend) {
        console.log('No text or no friend selected');
        return;
    }
    
    console.log("Attempting to send message:", {
        senderId: currentUser.user_id,
        receiverId: selectedFriend.user_id,
        content: text
    });

    try {
        const response = await axios.post('http://localhost:3000/api/messages/send', {
            senderId: currentUser.user_id,
            receiverId: selectedFriend.user_id,
            content: text
        });

        setText('');
        setMessages([...messages, {
            content: text,
            sender_id: currentUser.user_id,
            sent_at: new Date().toISOString() // This will set the time when the message was added
        }]);

        toast.success('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data.message : 'Failed to send message');
    }
};

    return (
        <div className="Chatcontainer">
        <div className="Messages">

    {friends.map(friend => (
        <div key={friend.user_id} className="Message" onClick={() => handleFriendClick(friend)}>
            <img src={"../../public/Uploads/"+friend.profile_picture}  />
            <div className="userinfo">
                <span>{friend.username}</span>
            </div>
        </div>
    ))}
    
</div>

<div className="chat">
    {selectedFriend && (
        <>
        <div className="top">
                    <div className="user">
                        <img src={"../../public/Uploads/" + selectedFriend.profile_picture} alt="" />
                        <div className="texts">
                            <span>{selectedFriend.username}</span>
                        </div>
                    </div>
                </div>
                
            <div className="center">
                {
                messages.map((message, index) => (
                    // Here there is the error
                    <div key={index} className={`textMessage ${message.sender_id == currentUser.user_id ? 'Own' : 'Other'}`}>
                       { message.sender_id != currentUser.user_id && <img  src={"../../public/Uploads/" + selectedFriend.profile_picture} alt="" />}
                        <div className="text">
                        <p>{message.content}</p>
                        </div>
                    </div>
                ))}

            </div>
            <div className="bottom">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
                <button className='sendButton' onClick={handleSendMessage}>Send</button>
            </div>
        </>
    )}
</div>

    </div>
    );
};

export default Messages;
