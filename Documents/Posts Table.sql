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