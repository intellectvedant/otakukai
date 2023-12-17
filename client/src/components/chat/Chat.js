import React, { useState, useEffect, useContext } from "react";
import {
  Box,
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

const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #000",
  display: "grid",
  gridTemplateRows: "(1fr 3fr 1fr)",
  borderRadius: "12px",
  margin: "85px",
  maxHeight: "auto",
  [theme.breakpoints.down("md")]: {
    margin: "85px 3px",
    maxHeight: "800px",
  },
}));

const ChatContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxHeight: "auto",
  width: "100%",
  marginTop: (theme) => theme.spacing(4),
});

const ChatPaper = styled(Paper)({
  width: "100%",
  padding: "2px 0px",
  padding: (theme) => theme.spacing(2),
  height: "240px",
  overflowY: "auto",
  backgroundColor: "#e5F5F5"
});

const ChatHeader = styled("div")({
  padding: "0px 8px",
  fontSize: "14px",
  margin: "6px",
  fontWeight: "bolder",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

const ChatFooter = styled("div")({
  padding: "1px 5px",
  display: "flex",
  alignItems: "center",
  marginTop: "2px",
  gap: "5px",
});

const ChatMessage = styled(ListItem)({
  display: "flex",
  borderRadius: "12px",
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: "10px",
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
    <Container>
      <ChatHeader>
        <Box>
          {messages?.length !== 0 && messages[0]?.receiver?._id === username
            ? `${messages[0]?.receiver?.username}`
            : `${messages[0]?.sender?.username}`}
        </Box>
        <Box
          sx={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            backgroundColor: isUserOnline ? "green" : "red",
          }}
        />
      </ChatHeader>
      <ChatContainer>
        <ChatPaper elevation={3}>
          <List>
            {isDataFetched && messages?.length !== 0
              ? messages?.map((message) => (
                  <ChatMessage key={message?._id} alignItems="flex-start">
                    <ListItemText
                      primary={message?.message}
                      secondary={message?.sender.username}
                    />
                  </ChatMessage>
                ))
              : "Wow! this Empty."}
          </List>
        </ChatPaper>
      </ChatContainer>
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
        <Button variant="contained" sx={{borderRadius: "12px", bgcolor: "#64acac" }} onClick={handleSendMessage}>
          Send
        </Button>
      </ChatFooter>
    </Container>
  );
};

export default Chat;
