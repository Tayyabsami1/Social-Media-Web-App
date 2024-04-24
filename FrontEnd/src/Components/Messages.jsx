import React from 'react'
import '../Css/Messages.scss'
import mypic from '../assets/mypic.png'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const Messages = () => {
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


                <div className="center"></div>

                <div className="bottom">
                    <div className="icons">
                        <CameraAltIcon />
                    </div>

                    <input type="text" placeholder='Write a message ...' />

                    <div className="emoji">
                        <EmojiEmotionsIcon />
                    </div>
                    <button className='sendButton'>Send</button>
                </div>
            </div>

        </div>
    )
}

export default Messages
