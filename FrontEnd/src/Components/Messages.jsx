import React, { useState } from 'react'
import '../Css/Messages.scss'
import mypic from '../assets/mypic.png'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmojiPicker from 'emoji-picker-react';

const Messages = () => {
    const [open, setopen] = useState(false);
    const [text, settext] = useState("");

    const handleEmoji = (e) => {
        console.log(e)
        settext((prev)=>(prev+e.emoji));
    }


    return (
        <div className="Chatcontainer">

            <div className='Messages'>

                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="Message">
                    <img src={mypic} alt="" />

                    <div className="userinfo">
                        <span>Tayyab Kamran</span>
                        <p>Hello</p>
                    </div>
                </div>
            </div>

            <div className="chat">

                <div className="top">
                    <div className="user">
                        <img src={mypic} alt="" />
                        <div className="texts">
                            <span>Tayyab Kamran</span>
                            <p>Hi Hello how are you  </p>
                        </div>
                    </div>
                </div>


                <div className="center">
                    <div className="textMessage">
                        <img src={mypic} alt="" />
                        <div className="text">
                            <p>Hi there bro how are you doing mad fwefiuehfiu ihefiuewfh iu2hfewiufh ewiuheiuheiu </p>
                            <span>1 min ago </span>
                        </div>
                    </div>
                    <div className="textMessage">
                        <img src={mypic} alt="" />
                        <div className="text">
                            <p>Hi there bro </p>
                            <span>1 min ago </span>
                        </div>
                    </div>

                    <div className="textMessage">
                        <img src={mypic} alt="" />
                        <div className="text">
                            <p>Hi there bro </p>
                            <span>1 min ago </span>
                        </div>
                    </div>

                    <div className="textMessage Own">
                        <div className="text">
                        <img src={mypic} alt="" />
                            <p>Hi there bro looking cool meow meow i dont overflow as i am a good text   </p>
                            <span>1 min ago </span>
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <div className="icons">
                        <CameraAltIcon />
                    </div>

                    <input type="text" placeholder='Write a message ...' onChange={e => settext(e.target.value)} value={text} />

                    <div className="emoji">
                        <EmojiEmotionsIcon onClick={() => setopen(!open)} />
                        <EmojiPicker className='picker' open={open} onEmojiClick={handleEmoji} />
                    </div>
                    <button className='sendButton'>Send</button>
                </div>
            </div>

        </div>
    )
}

export default Messages
