import React from 'react';
import { Box, styled, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

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

const ChatItem = ({ user, lastMessage, profileImage }) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar alt={user} src={profileImage} />
    </ListItemAvatar>
    <ListItemText
      primary={user}
      secondary={lastMessage}
    />
  </ListItem>
);

const Chatbar = () => {
  // Dummy data for illustration
  const chatList = [
    { user: 'User1', lastMessage: 'Hello!', profileImage: 'profile1.jpg' },
    { user: 'User2', lastMessage: 'Hi there!', profileImage: 'profile2.jpg' },
    // Add more chat items as needed
  ];

  return (
    <Container>
      <List>
        {chatList.map((chat, index) => (
          <ChatItem
            key={index}
            user={chat.user}
            lastMessage={chat.lastMessage}
            profileImage={chat.profileImage}
          />
        ))}
      </List>
    </Container>
  );
};

export default Chatbar;
