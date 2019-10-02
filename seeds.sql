-- mock data for book tables
-- =========================================================== 
INSERT INTO books (id, name, author, bio)
VALUES (1, 'this is a book name', 'author', 'this is a bioooooo');

INSERT INTO books (id, name, author, bio)
VALUES (2, 'book name', 'book author', 'book bio part 2');

-- mock data for members table
-- =========================================================== 
INSERT INTO member (name, email)
VALUES ('username1', 'user1@gmail.com');

INSERT INTO member (name, email)
VALUES ('username2', 'user2@gmail.com');

-- mock data for club table
-- =========================================================== 
INSERT INTO club (name, currentbook, nextbook, eventlocation, eventtime)
VALUES ('bookclub1', 1, 2,'hogwarts', '12:00 PM');

INSERT INTO club (name, currentbook, nextbook, eventlocation, eventtime)
VALUES ('bookclub2', 5, 7,'chamber of secrets', '7:00 PM');


