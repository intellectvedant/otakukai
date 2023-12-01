import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  styled,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import EditIcon from "@mui/icons-material/Edit";
import { formatDistanceToNow } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";
import { API } from "../../service/api";

const Container = styled(Box)`
  border: 1px solid #000;
  margin: 2px 0px;
  border-radius: 12px;
  padding: px;
`;

const Uppercontainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 0px 8px;
  align-items: center;
`;

const Upperrightcontainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const Upperbottomcontainer = styled(Box)``;

const Bottomcontainer = styled(Box)`
  margin: 1px -5px 3px -5px;
  padding: 0px 8px;
`;

const Styledcomment = styled(Typography)`
  font-size: 14px;
  margin: 3px;
  word-break: break-word;
`;

const Username = styled(Typography)`
  font-size: 13px;
  font-weight: bold;
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

const Commenteditor = styled(Box)`
  display: flex;
  align-items: flex-end;
`;

const Stylededitcomment = styled(TextareaAutosize)`
  width: 100%;
  height: auto;
  position: relative;
  border-radius: 12px;
  padding: 8px;
`;

const Updatebutton = styled(Button)`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  right: 115px;
  background-color: #64acac;
  height: 20px;
  margin: 0px 0px 7px 0px;
`;

const CommentView = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);
  const [editedComment, setEditedComment] = useState(comment.comments);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (e) => {
    setMenu(e.currentTarget);
  };

  const handleEditClick = (e) => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    const response = await API.updateComment({
      _id: comment._id,
      comments: editedComment,
    });
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
      setIsEditing(false);
    }
    setMenu(null);
  };

  const handleClose = async (e) => {
    if (e.currentTarget.id === "deleteButton") {
      const response = await API.deleteComment(comment._id);
      if (response.isSuccess) {
        setToggle((prevState) => !prevState);
      }
    }
    setMenu(null);
  };

  const formattedDate =
    comment && comment.date
      ? formatDistanceToNow(new Date(comment.date), { addSuffix: true })
      : "";

  const timePart = formattedDate.replace(/about /, "");

  console.log(account.name);
  console.log(comment.name);

  return (
    <Container>
      <Uppercontainer>
        <Upperrightcontainer>
          <Username><Link to={`/userprofile/${comment.name}`}>{comment.name}</Link></Username>
          <Typography style={{ margin: "0 2px" }}> · </Typography>
          <Styleddate>{timePart}</Styleddate>
        </Upperrightcontainer>
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
            onClose={(e)=>{handleClose(e); handleEditClick(e);}}
          >
            {account.username === comment.name && (
              <>
                <Stylededit
                  id="editButton"
                  onClick={(e) => handleEditClick(e)}
                />
                <Styleddelete
                  id="deleteButton"
                  onClick={(e) => handleClose(e)}
                />
              </>
            )}
          </Popover>
        </Upperbottomcontainer>
      </Uppercontainer>
      <Bottomcontainer>
        {isEditing ? (
          <Commenteditor>
            <Stylededitcomment
              minRows={2}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              placeholder="Edit your comment!"
            />
            <Updatebutton
              variant="contained"
              onClick={(e) => handleSaveClick(e)}
            >
              Update
            </Updatebutton>
          </Commenteditor>
        ) : (
          <Styledcomment>{comment.comments}</Styledcomment>
        )}
      </Bottomcontainer>
    </Container>
  );
};

export default CommentView;
