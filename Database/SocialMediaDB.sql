create database SocialMediaDB;
use SocialMediaDB;

--Written by Imran
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT,
    location VARCHAR(100),
    occupation VARCHAR(50),
    interests TEXT,
    birthdate DATE NOT NULL,
    profile_picture VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
);

drop table Users

select * from Users
insert into Users (username,password) values ('tayyab','123')

-- Written by Imran
CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    post_type VARCHAR(10) NOT NULL,
    media_url VARCHAR(255),
    timestamp DATETIME2 DEFAULT GETDATE(),
    privacy VARCHAR(10) NOT NULL,
    CONSTRAINT CHK_Post_Type CHECK (post_type IN ('text', 'photo', 'video')),
    CONSTRAINT CHK_Privacy_Type CHECK (privacy IN ('public', 'friends', 'private')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
