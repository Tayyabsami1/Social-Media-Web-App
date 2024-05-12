use SocialMediaDB;
CREATE TRIGGER UpdateUserTimestamp
ON Users
AFTER UPDATE
AS
BEGIN
    UPDATE Users 
    SET updated_at = CURRENT_TIMESTAMP 
    FROM inserted
    WHERE Users.user_id = inserted.user_id;
END;

CREATE TRIGGER DeleteCommentsOnPostDelete
ON Posts
AFTER DELETE
AS
BEGIN
    -- Delete comments associated with the deleted post
    DELETE FROM Comments 
    WHERE post_id IN (SELECT post_id FROM deleted);
END;

CREATE TRIGGER UpdatePostTimestamp
ON Posts
AFTER UPDATE
AS
BEGIN
    -- Update the timestamp for modified posts
    UPDATE Posts
    SET timestamp = CURRENT_TIMESTAMP
    FROM inserted
    WHERE Posts.post_id = inserted.post_id;
END;


CREATE TRIGGER DeleteLikesOnPostDelete
ON Posts
AFTER DELETE
AS
BEGIN
    -- Delete likes associated with the deleted post
    DELETE FROM Likes 
    WHERE post_id IN (SELECT post_id FROM deleted);
END;

CREATE TRIGGER CheckAgeBeforeInsert
ON Users
INSTEAD OF INSERT
AS
BEGIN
    -- Check the age before insertion
    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE DATEDIFF(year, birthdate, GETDATE()) < 18
    )
    BEGIN
        -- If age is less than 18, don't insert the record
        RAISERROR ('User must be at least 18 years old.', 16, 1)
        ROLLBACK TRANSACTION;
    END
    ELSE
    BEGIN
        -- If age is 18 or older, proceed with insertion
        INSERT INTO Users (username, email, password, first_name, last_name, bio, location, occupation, interests, birthdate, profile_picture, cover_picture, created_at, updated_at)
        SELECT username, email, password, first_name, last_name, bio, location, occupation, interests, birthdate, profile_picture, cover_picture, created_at, updated_at
        FROM inserted;
    END
END;





CREATE TRIGGER CheckCommentContent
ON Comments
INSTEAD OF INSERT
AS
BEGIN
    -- Check comment content before insertion
    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE 
            content LIKE '%Shit%'
            OR content LIKE '%Bastard%'
            OR content LIKE '%Bitch%'
            OR content LIKE '%Sexy%'
            OR content LIKE '%Bad%'
            OR content LIKE '%Hate%'
    )
    BEGIN
        -- If comment contains inappropriate language, raise an error
        RAISERROR ('Comment contains inappropriate language.', 16, 1);
		ROLLBACK TRANSACTION;
    END
    ELSE
    BEGIN
        -- If comment is appropriate, proceed with insertion
        INSERT INTO Comments (user_id, post_id, content, timestamp)
        SELECT user_id, post_id, content, timestamp
        FROM inserted;
    END
END;

drop trigger CheckCommentContent



