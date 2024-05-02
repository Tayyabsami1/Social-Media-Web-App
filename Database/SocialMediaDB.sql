create database SocialMediaDB;
use SocialMediaDB;
drop database SocialMediaDB
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
drop table Posts
CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    post_type VARCHAR(10) ,
    media_url VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

--Written by Saad
CREATE TABLE Messages (
    message_id INT IDENTITY(1,1) PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id)
);

create table Comments (
	comment_id INT IDENTITY(1,1) primary key,
    user_id INT NOT NULL,
	post_id INT NOT NULL,
    content TEXT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES Users(user_id) ,
	FOREIGN KEY (post_id) references Posts(post_id) ,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)



create table Friends(
	 Friend_id INT IDENTITY(1,1) PRIMARY KEY,
	friend_id_1 INT FOREIGN KEY REFERENCES Users(user_id),
	friend_id_2 INT FOREIGN KEY REFERENCES Users(user_id),
);

CREATE TABLE Requests (
    request_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    requester_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ,
    FOREIGN KEY (requester_id) REFERENCES Users(user_id),
);

drop table Users
drop table Friends
drop table Posts
drop table Messages
drop table Comments


select * from Users
select * from Friends
select * from Posts
select * from Messages
select * from Comments
select * from Requests

insert into Friends(friend_id_1,friend_id_2) values(1,2)
INSERT INTO Messages (sender_id, receiver_id, content)
VALUES 
(1, 2, 'Hey Jane'),
(2, 1, 'Hi John');

insert  into Posts(user_id,content,post_type) values(2,'Hello G','Video')

insert into Comments(user_id,post_id,content ) values(2,2,'Great work bro')