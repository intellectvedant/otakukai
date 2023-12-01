import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import {Link} from 'react-router-dom'

const Container = styled(Box)`
  border: 1px solid #000;
  border-radius: 12px;
  margin: 15px;
  height: 350px;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;
const Image = styled("img")({
  width: "100%",
  objectFit: "150px",
  height: "150px",
});

const Uppercontainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 3px;
  padding: 0px 8px;
  align-items: center;
`;

const Upperrightcontainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const Title = styled(Typography)`
  font-size: 14px;
  margin: 3px;
  font-weight: bolder;
`;

const Description = styled(Typography)`
  font-size: 14px;
  margin: 3px;
  word-break: break-word;
`;

const Username = styled(Typography)`
  font-size: 13px;
  font-weight: bold;
`;

const Categories = styled(Typography)`
  font-size: 11px;
  font-weight: bolder;
`;

const Styleddate = styled(Typography)`
  font-size: 11px;
  font-weight: bolder;
`;

const Post = ({ post }) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdDate), {
    addSuffix: true,
  });

  const timePart = formattedDate.replace(/about /, "");

  return (
    <Container>
      <Uppercontainer>
        <Upperrightcontainer>
          <Username><Link to={`/userprofile/${post.username}`}>{post.username}</Link></Username>
          <Typography style={{ margin: '0 2px' }}> · </Typography>
          <Styleddate>{timePart}</Styleddate>
        </Upperrightcontainer>
        <Categories>{post.categories}</Categories>
      </Uppercontainer>

      <Image src={post.picture ? post.picture : "https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="otakukai"></Image>
      <Title>{post.title.length > 70? `${post.title.slice(0,70)}...`: post.title}</Title>
      <Description>{post.description.length > 100? `${post.description.slice(0,100)}...`:post.description}</Description>
    </Container>
  );
};

export default Post;
