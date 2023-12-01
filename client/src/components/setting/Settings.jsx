import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  styled,
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactlessOutlinedIcon from "@mui/icons-material/ContactlessOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { useData } from "../../context/DataProvider";
import logout from "../../images/logout.jpg";


const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #000",
  borderRadius: "12px",
  margin: "85px",
  height: "400px",
  "& > p": {
    padding: "0 5px 5px 5px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "85px 3px",
  },
}));

const Gridcontainer = styled(Grid)`
  height: 100%;
  width: 100%;
`;
const Bottomgrid = styled(Grid)`
  height: 100%;
  width: 100%;
`;

const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color: 3s, box-shadow: 3s",
  "&:hover": {
    backgroundColor: "#c1dede",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
}));

const Leftbox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 7px;
  height: 100%;
`;

const Image = styled("img")({
  width: "230px",
  height: "230px",
  borderRadius: "52px",
});

const Profilebox = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Logoutbox = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SubProfilebox = styled(Box)`
  margin: 10px;
  padding: 20px;
  width: 100%;
  height: 300px;
  cursor: pointer;
  border-radius: 12px;
  background-color: #e9f5f9;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Styledbox = styled(Typography)`
  padding: 25px;
  &:hover {
    background-color: #d3eaf2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;
const Styledtextbox = styled(Box)`
  padding: 25px;
  &:hover {
    background-color: #d3eaf2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;
const Boxedit = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Textbox = styled(TextareaAutosize)`
  width: 100%;
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

const Maincontentbox = styled(Box)`
  margin: auto 10px;
  padding: 20px;
  width: 100%;
  height: 300px;
  cursor: pointer;
  border-radius: 12px;
  background-color: #e9f5f9;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Logoutimage = styled("img")({
  height: "100%",
  width: "100%",
});

const Settings = () => {
  const { updateEienyo, updateName} = useData();
  const { account } = useContext(DataContext);
  const [optionSelected, setOptionSelected] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [editedComment, seteditedComment] = useState(account.eienyo);
  const [editedName, seteditedName] = useState(account.Name);
  const [toggle, setToggle] = useState(false);

  const handleClick = (option) => {
    setOptionSelected(option);
  };

  // eienyo edit
  const editedClick = (e) => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    const response = await API.updateEienyo({
      _id: account._id,
      eienyo: editedComment,
    });
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
      setIsEditing(false);
      updateEienyo(editedComment);
    }
  };

  // name edit

  const editedNameClick = (e) => {
    setIsNameEditing(true);
  };

  const handleSaveNameClick = async (e) => {
    const response = await API.updateName({
      _id: account._id,
      name: editedName,
    });
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
      setIsNameEditing(false);
      updateName(editedName);
    }
  };

  const menuContent = (
    <Leftbox>
      <StyledListItem onClick={() => handleClick("profile")}>
        <ListItemIcon>
          <ContactlessOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </StyledListItem>
      <StyledListItem onClick={() => handleClick("contact")}>
        <ListItemIcon>
          <ContactlessOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </StyledListItem>
      <StyledListItem onClick={() => handleClick("setting")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </StyledListItem>
      <StyledListItem onClick={() => handleClick("logout")}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </StyledListItem>
    </Leftbox>
  );

  return (
    <Container>
      <Gridcontainer container>
        <Grid item lg={2} sm={2} xs={12}>
          {menuContent}
        </Grid>
        <Bottomgrid container lg={10} sm={10} xs={12}>
          {optionSelected === "profile" && (
            <Profilebox>
              <SubProfilebox
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <Image src={account.picture} alt="user" />
              </SubProfilebox>
              <SubProfilebox>
                <Styledbox>Shikigami : {account.username}</Styledbox>
                <Styledbox>
                  <Boxedit>
                    <Typography>Name :</Typography>
                    <Button>
                      <EditIcon onClick={(e) => editedNameClick(e)} />
                    </Button>
                  </Boxedit>

                  {isNameEditing ? (
                    <>
                      <Textbox
                        minRows={3}
                        value={editedName}
                        placeholder="Enter Your name"
                        onChange={(e) => seteditedName(e.target.value)}
                      />
                      <Updatebutton
                        variant="contained"
                        onClick={(e) => handleSaveNameClick(e)}
                      >
                        Update
                      </Updatebutton>
                    </>
                  ) : (
                    <Typography>{account.name}</Typography>
                  )}
                </Styledbox>

                <Styledtextbox>
                  <Boxedit>
                    <Typography>Eienyō (永遠引用)</Typography>
                    <Button>
                      <EditIcon onClick={(e) => editedClick(e)} />
                    </Button>
                  </Boxedit>
                  {isEditing ? (
                    <>
                      <Textbox
                        minRows={3}
                        value={editedComment}
                        placeholder="Enter your favourite anime quote?"
                        onChange={(e) => seteditedComment(e.target.value)}
                      />
                      <Updatebutton
                        variant="contained"
                        onClick={(e) => handleSaveClick(e)}
                      >
                        Update
                      </Updatebutton>
                    </>
                  ) : (
                    <Typography>{account.eienyo}</Typography>
                  )}
                </Styledtextbox>
              </SubProfilebox>
            </Profilebox>
          )}

          {optionSelected === "contact" && (
            <Maincontentbox>
              <Styledbox>Developer Name: Vedant Tiwari</Styledbox>
              <Styledbox> Email Id: vedantwinner4@gmail.com</Styledbox>
              <Styledbox> Buy me a coffee</Styledbox>
            </Maincontentbox>
          )}

          {optionSelected === "setting" && (
            <Maincontentbox>
              <Styledbox> Buy me a coffee</Styledbox>
            </Maincontentbox>
          )}

          {optionSelected === "logout" && (
            <Logoutbox>
              <Maincontentbox>
                <Logoutimage src={logout} alt="logout" />
              </Maincontentbox>

              <Maincontentbox>
                <Styledbox>Are you sure, wanna still logout?</Styledbox>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Styledbox style={{ textAlign: "center" }}>
                    <Button style={{ color: "#000" }}>Logout Anyway</Button>
                  </Styledbox>
                </Link>
              </Maincontentbox>
            </Logoutbox>
          )}
        </Bottomgrid>
      </Gridcontainer>
    </Container>
  );
};

export default Settings;
