CREATE TABLE IF NOT EXISTS history (
    current_username VARCHAR(50),
    other_username VARCHAR(50) NOT NULL,
    roomid text NOT NULL,
    time_started timestamptz,
    time_ended timestamptz,
    question text NOT NULL,
    language_used text NOT NULL,
    code text NOT NULL,
    difficulty text NOT NULL,
    PRIMARY KEY (current_username, time_started)
);