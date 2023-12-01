import React, { useState, useContext, useEffect } from "react";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

// components

import CommentView from "./CommentView";

const Container = styled(Box)(({ theme }) => ({
  margin: "25px 3px 1px 3px",
  height: "auto",
  // '& > p': {
  //   padding: '0 5px 5px 5px',
  // },
  [theme.breakpoints.down("md")]: {
    margin: "15px 2px",
  },
}));

const Uppercontainer = styled(Box)`
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const Styledtextrea = styled(TextareaAutosize)`
  width: 100%;
  height: auto;
  margin: 0 3px;
  border-radius: 12px;
  padding: 8px;
`;

const commentInitialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

const Comment = ({ post }) => {
  const [comment, setComment] = useState(commentInitialValues);
  const [toggle, setToggle] = useState(false)
  const { account } = useContext(DataContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    };
    if (post._id) {
      getData();
    }
  }, [post, toggle]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    let response = await API.newComment(comment);
    if (response.isSuccess) {
      setComment(commentInitialValues);
    }
    setToggle(prevState => !prevState)
  };

  return (
    <Container>
      <Uppercontainer>
        <img />
        <Styledtextrea
          minRows={3}
          placeholder="comment?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
          name="comment"
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: "25px" }}
          onClick={(e) => addComment(e)}
        >
          {" "}
          Comment{" "}
        </Button>
      </Uppercontainer>

      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => <CommentView comment={comment} setToggle={setToggle}/>)}
      </Box>
    </Container>
  );
};

export default Comment;
