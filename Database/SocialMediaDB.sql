create database SocialMediaDB;
use SocialMediaDB;
drop database SocialMediaDB
--Written by Imran
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) default '' ,
    last_name VARCHAR(50) default '',
    bio TEXT default '',
    location VARCHAR(100) default '',
    occupation VARCHAR(50) default '',
    interests TEXT default '',
    birthdate DATE NOT NULL ,
    profile_picture VARCHAR(255) default 'profile_pic.jpg',
	cover_picture varchar(255) default 'cover_pic.jpg',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
);


-- Written by Imran
CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    content varchar(1000) NOT NULL,
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

create table Likes (
	like_id int Identity(1,1) primary key,
	user_id int not null,
	post_id int not null, 
	FOREIGN KEY (user_id) REFERENCES Users(user_id) ,
	FOREIGN KEY (post_id) references Posts(post_id) 
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
drop table Likes 
drop table Requests


select * from Users
select * from Friends
select * from Posts
select * from Messages
select * from Comments
select * from Requests
select * from Likes 

insert into Friends(friend_id_1,friend_id_2) values(2,1)
INSERT INTO Messages (sender_id, receiver_id, content)
VALUES 
(1, 2, 'Hey Jane'),
(2, 1, 'Hi John');

insert  into Posts(user_id,content,post_type) values(2,'Hello G','Video')

insert into Comments(user_id,post_id,content ) values(2,2,'Great work bro')

insert into Likes (user_id,post_id) values (1,5)

select    p.*,  u.user_id as UserId, u.username,u.profile_picture from Posts as p  join Users as u on u.user_id=p.user_id  join Friends f on p.user_id=f.friend_id_1 where  p.user_id=1 order by p.timestamp desc

select * from Users
update users set location='Lahore' where user_id=1

DELETE FROM Friends WHERE Friend_id=27