--Create the chatbots table
CREATE TABLE chatbots (
  id SERIAL PRIMARY KEY,
  clerk_user_id VARCHAR(255) NOT NULL,--Clerks user ID
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--CREATE THE CHATBOT CHARACTERISTICS TABLE
CREATE TABLE chatbot_characteristics (
  id SERIAL PRIMARY KEY,
  chatbot_id INT REFERENCES chatbots(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
); 

--Create the guests table
CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--Create the chat_sessions table
CREATE TABLE chat_sessions (
  id SERIAL PRIMARY KEY,
  chat_id INT REFERENCES chatbots(id) ON DELETE CASCADE,
  guest_id INT REFERENCES guests(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--Create the messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chat_session_id INT REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  sender VARCHAR(50) NOT NULL-- 'User' or 'ai'
);
-- --------------------------------
-- This step is more of a BUG FIX to ensure that the created_at column is set to thecurrent timestamp when a new record is inserted.
--We experienced a strange issue with this but usually its not necessary to do this.
-- Create the trigger function to set created_at.

CREATE OR REPLACE FUNCTION set_created_at()
RETURNS TRIGGER AS $$
BEGIN
   IF NEW.created_at IS NULL THEN
      NEW.created_at = CURRENT_TIMESTAMP;
   END IF;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create triggers for each table to set created_at
CREATE TRIGGER set_chatbots_created_at
BEFORE INSERT ON chatbots
FOR EACH ROW
EXECUTE FUNCTION set_created_at();

CREATE TRIGGER set_chatbots_created_at
BEFORE INSERT ON chatbots
FOR EACH ROW
EXECUTE FUNCTION set_created_at();

CREATE TRIGGER set_chatbot_characteristics_created_at
BEFORE INSERT ON chatbot_characteristics
FOR EACH ROW
EXECUTE FUNCTION set_created_at(); 

CREATE TRIGGER set_guests_created_at
BEFORE INSERT ON guests
FOR EACH ROW
EXECUTE FUNCTION set_created_at();

CREATE TRIGGER set_chat_sessions_created_at
BEFORE INSERT ON chat_sessions
FOR EACH ROW
EXECUTE FUNCTION set_created_at();

CREATE TRIGGER set_messages_created_at
BEFORE INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION set_created_at();

-- --------------------------------
-- Insert sample data
INSERT INTO chatbots (clerk-user-id, name) VALUES ('user_123', 'My First Chatbot');

-- Insert sample data for chatbot_characteristics
INSERT INTO chatbot_characteristics (chatbot_id, content) VALUES 
(1, 'You are a nice chatbot have a good time!'); 
chatbot_characteristics (chatbot_id, content) VALUES (1, 'You are a helpful assistant.');

-- Insert sample data for guests
INSERT INTO guests (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

-- Insert sample data for chat_sessions
INSERT INTO chat_sessions (chat_id, guest_id) VALUES
(1, 1),
(1, 2);

-- Insert sample data for messages
INSERT INTO messages (chat_session_id, content, sender) VALUES
(1, 'Hello, how are you?', 'User'),
(1, 'I am doing great, thanks for asking!', 'ai'),