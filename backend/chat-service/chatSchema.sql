CREATE TABLE IF NOT EXISTS messages (
    room_id text,
    username VARCHAR(50),
    message text,
    sent TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (room_id, username, sent)
);