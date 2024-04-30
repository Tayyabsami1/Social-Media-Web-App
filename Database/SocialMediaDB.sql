create database SocialMediaDB;
use SocialMediaDB;

--Written by Imran
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) ,
    last_name VARCHAR(50) ,
    bio TEXT,
    location VARCHAR(100),
    occupation VARCHAR(50),
    interests TEXT,
    birthdate DATE NOT NULL,
    profile_picture VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
);


drop table Users


-- Written by Imran
CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    post_type VARCHAR(10) ,
    media_url VARCHAR(255),
    timestamp DATETIME2 DEFAULT GETDATE(),
    --privacy VARCHAR(10) NOT NULL,
    --CONSTRAINT CHK_Post_Type CHECK (post_type IN ('text', 'photo', 'video')),
    --CONSTRAINT CHK_Privacy_Type CHECK (privacy IN ('public', 'friends', 'private')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

 drop table Posts
insert  into Posts(user_id,content,post_type) values(2,'Hello G','Video')

create table Friends(
	 Friend_id INT IDENTITY(1,1) PRIMARY KEY,
	friend_id_1 INT FOREIGN KEY REFERENCES Users(user_id),
	friend_id_2 INT FOREIGN KEY REFERENCES Users(user_id),
);

select * from Users
select * from Friends
select * from Posts

insert into Friends(friend_id_1,friend_id_2) values(8,1)