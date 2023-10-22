CREATE TABLE IF NOT EXISTS matched (
    username VARCHAR(50) PRIMARY KEY,
    room_id text NOT NULL,
    question text NOT NULL
);