import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../../service/api.js";
import EditIcon from "@mui/icons-material/Edit";
import { formatDistanceToNow } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../../../context/DataProvider.js";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";

// components

import Comment from "../../comments/Comment.js";

const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #000",
  borderRadius: "12px",
  margin: "85px",
  height: "auto",
  "& > p": {
    padding: "0 5px 5px 5px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "85px 3px",
  },
}));

const Image = styled("img")({
  width: "100%",
  objectFit: "150px",
  height: "auto",
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

const Upperbottomcontainer = styled(Box)``;

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

const Stylededit = styled(EditIcon)`
  border: 1px solid #000;
  padding: 2px;
  margin: 0px 3px;
  font-size: 18px;
  border-radius: 12px;
`;

const Styleddelete = styled(DeleteIcon)`
  border: 1px solid #000;
  padding: 2px;
  margin: 0px 3px;
  font-size: 18px;
  border-radius: 12px;
`;

const Postview = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const { account } = useContext(DataContext);
  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);
  const Navigate = useNavigate();

  const handleClick = (e) => {
    setMenu(e.currentTarget);
  };

  const handleClose = async (e) => {
    setMenu(null);
    if (e.currentTarget.id === "deleteButton") {
      const response = await API.deletePost(post._id);
      if (response.isSuccess) {
        Navigate("/");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        window.scrollTo(0, 0);
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const formattedDate =
    post && post.createdDate
      ? formatDistanceToNow(new Date(post.createdDate), { addSuffix: true })
      : "";

  const timePart = formattedDate.replace(/about /, "");

  return (
    <Container>
      <Uppercontainer>
        <Upperrightcontainer>
          <Username><Link to={`/userprofile/${post.username}`}>{post.username}</Link></Username>
          <Typography style={{ margin: "0 2px" }}> · </Typography>
          <Styleddate>{timePart}</Styleddate>
        </Upperrightcontainer>
        <Categories>{post.categories}</Categories>
        <Upperbottomcontainer>
          <Button
            id="basicButton"
            aria-controls={open ? "basicMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? true : undefined}
            onClick={(e) => handleClick(e)}
          >
            <MoreHorizIcon />
          </Button>
          <Popover
            id="basicMenu"
            anchorEl={menu}
            open={open}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleClose}
          >
            {account.username === post.username && (
              <>
                <Link to={`/update/${post._id}`}>
                  <Stylededit onClick={(e) => handleClose(e)} />
                </Link>
                <Styleddelete
                  id="deleteButton"
                  onClick={(e) => handleClose(e)}
                />
              </>
            )}
          </Popover>
        </Upperbottomcontainer>
      </Uppercontainer>

      <Image
        src={
          post.picture
            ? post.picture
            : "https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="otakukai"
      ></Image>
      <Title>{post.title}</Title>
      <Description>{post.description}</Description>

      <Comment post={post} />
    </Container>
  );
};

export default Postview;
