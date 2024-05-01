import '../Css/Rightbar.scss'
import mypic from '../assets/mypic.png'

const Rightbar = () => {
    return (
        <div className='Rightbar'>
            <div className="container">
                <div className="item">
                    <span>Suggested for you</span>
                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <span>Tayyab Sami</span>
                        </div>
                        <div className="buttons">
                            <button>Add Friend</button>
                            <button>Dismiss</button>
                        </div>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <span>Tayyab Sami</span>
                        </div>
                        <div className="buttons">
                            <button>Add Friend</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <p>
                                <span>Tayyab Sami</span> Changed their picture
                            </p>
                        </div>
                        <span>1 min ago </span>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <p>
                                <span>Tayyab Sami</span> liked a photo 
                            </p>
                        </div>
                        <span>1 min ago </span>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <p>
                                <span>Tayyab Sami</span> liked a comment 
                            </p>
                        </div>
                        <span>1 min ago </span>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <p>
                                <span>Tayyab Sami</span> posted 
                            </p>
                        </div>
                        <span>1 min ago </span>
                    </div>
                </div>

                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <div className="online"/>
                                <span>Tayyab Sami</span>
                        </div>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <div className="online"/>
                                <span>Tayyab Sami</span>
                        </div>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <div className="online"/>
                                <span>Tayyab Sami</span>
                        </div>
                    </div>

                    <div className="user">
                        <div className="userinfo">
                            <img src={mypic} alt="" />
                            <div className="online"/>
                                <span>Tayyab Sami</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Rightbar
