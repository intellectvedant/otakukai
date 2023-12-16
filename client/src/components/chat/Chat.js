import React, { useState, useEffect, useContext } from "react";
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
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import { getAccessToken } from "../../utils/comman-utlis";

const API_URL = "http://localhost:8000";

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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { username } = useParams();
  const { account } = useContext(DataContext);

  const sender = account?._id;
  const receiver = username;

  useEffect(() => {
    const getMessage = async () => {
      if (receiver !== undefined) {
        const response = await axios.get(
          `${API_URL}/user/get/message/${sender}/${receiver}`,
          {
            headers: {
              authorization: getAccessToken(),
            },
          }
        );

        if (response.data) {
          console.log({ message: response.data });
          setMessages(response.data);
          setIsDataFetched(true);
        }
      }
    };
    getMessage();
  }, [sender, receiver]);

  const handleSendMessage = async () => {
    const response = await API.sendMessage({
      sender,
      receiver,
      message: newMessage,
    });

    if (newMessage.trim() === "") {
      return;
    }

    // Update the local messages state
    setMessages([
      ...messages,
      {
        sender: account?.username, // assuming you have a username in your account
        receiver: username,
        message: newMessage,
      },
    ]);

    // Clear the message input
    setNewMessage("");

    // Send the message to the other user
    const message = {
      text: newMessage,
      sender: account?.username,
      receiver: username,
    };
    socket.emit("message", message);
    socket.emit("login", sender);
  };

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:8000");

    // Listen for the 'connect' event
    newSocket.on("connect", () => {
      console.log("Connected to the server");
      newSocket.emit("login", sender);
    });

    // Listen for incoming messages
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // online users details
    newSocket.on("onlineUsers", (onlineUsers) => {
      console.log("onlineUsers:", onlineUsers);
      setOnlineUsers(onlineUsers);
    });

    // Set the socket state
    setSocket(() => newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [sender]);

  const isUserOnline = onlineUsers.includes(receiver);
  console.log(onlineUsers);
  console.log(isUserOnline);

  return (
    <ChatContainer>
      <ChatPaper elevation={3}>
        <ChatHeader>
          <div>
            Chat with {username}
            {isUserOnline ? "(Online)" : "(Offline)"}
          </div>
        </ChatHeader>
        <List>
          {isDataFetched && messages?.length !== 0
            ? messages?.map((message) => (
                <ChatMessage key={message?._id} alignItems="flex-start">
                  <ListItemText
                    primary={message?.message}
                    secondary={message?.sender}
                  />
                </ChatMessage>
              ))
            : "Wow! this Empty."}
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
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </ChatFooter>
    </ChatContainer>
  );
};

export default Chat;
