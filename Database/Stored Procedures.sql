use SocialMediaDB
CREATE PROCEDURE AddUser(
    @p_username VARCHAR(50),
     @p_email VARCHAR(255),
     @p_password VARCHAR(255),
     @p_first_name VARCHAR(50),
     @p_last_name VARCHAR(50),
     @p_bio TEXT,
     @p_location VARCHAR(100),
     @p_occupation VARCHAR(50),
     @p_interests TEXT,
    @p_birthdate DATE,
     @p_profile_picture VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users (username, email, password, first_name, last_name, bio, location, occupation, interests, birthdate, profile_picture)
    VALUES (@p_username, @p_email, @p_password, @p_first_name, @p_last_name, @p_bio, @p_location, @p_occupation, @p_interests, @p_birthdate, @p_profile_picture);
END 

CREATE PROCEDURE AddPost(
    @p_user_id INT,
    @p_content varchar(1000),
    @p_post_type varchar(10),
    @p_media_url VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Posts (user_id, content, post_type, media_url)
    VALUES (@p_user_id, @p_content, @p_post_type, @p_media_url);
END 

CREATE PROCEDURE AddComment(
    @p_post_id INT,
    @p_user_id INT,
    @p_content TEXT
)
 AS
BEGIN
    INSERT INTO Comments (post_id, user_id, content)
    VALUES (@p_post_id, @p_user_id, @p_content);
END 

CREATE PROCEDURE LikePost(
    @p_post_id INT,
    @p_user_id INT
)
AS
BEGIN
    INSERT INTO Likes (post_id, user_id)
    VALUES (@p_post_id, @p_user_id);
END




CREATE PROCEDURE AddFriend(
    @p_user_id_1 INT,
    @p_user_id_2 INT
)
AS
BEGIN
    DECLARE @user_count INT;

    -- Check if both users exist
    SELECT @user_count = COUNT(*) FROM Users WHERE user_id IN (@p_user_id_1, @p_user_id_2);
    IF (@user_count = 2)
    BEGIN
        -- Check if users are already friends
        IF NOT EXISTS (
            SELECT * FROM Friends
            WHERE (friend_id_1 = @p_user_id_1 AND friend_id_2 = @p_user_id_2)
            OR (friend_id_1 = @p_user_id_2 AND friend_id_2 = @p_user_id_1)
        )
        BEGIN
            -- Add friendship
            INSERT INTO Friends (friend_id_1, friend_id_2)
            VALUES (LEAST(@p_user_id_1, @p_user_id_2), GREATEST(@p_user_id_1, @p_user_id_2));
        END
    END
END;

create Procedure DeletePost(
	@post_id int ,
	@user_id int 
)
as 
begin 
	delete from Posts where post_id=@post_id and user_id=@user_id;
end 

drop Procedure DeletePost