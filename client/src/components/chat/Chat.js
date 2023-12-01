import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const ChatContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "85px",
  marginTop: (theme) => theme.spacing(4),
  height: "60vh",
});

const ChatPaper = styled(Paper)({
  width: "90%",
  padding: (theme) => theme.spacing(2),
  height: "80%",
  overflowY: "auto",
});

const ChatHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

const ChatFooter = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
});

const ChatMessage = styled(ListItem)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: "10px",
});


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:8000");

    // Listen for the 'connect' event
    newSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Listen for incoming messages
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Set the socket state
    setSocket(() => newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      // Send the message to the other user
      const message = { text: newMessage, sender: username };
      socket.emit("message", message);

      // Update the local messages state
      if(message.sender !== username){
        setMessages([...messages, message]);
      }
      setNewMessage("");

    }
  };

  return (
    <ChatContainer>
      <ChatPaper elevation={3}>
        <ChatHeader>
          <div>Chat with {username}</div>
        </ChatHeader>
        <List>
          {messages.map((message, index) => (
            <ChatMessage key={index} alignItems="flex-start">
              <ListItemText
                primary={message.text}
                secondary={message.sender === username ? "You" : username}
              />
            </ChatMessage>
          ))}
        </List>
      </ChatPaper>
      <ChatFooter>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </ChatFooter>
    </ChatContainer>
  );
};

export default Chat;
