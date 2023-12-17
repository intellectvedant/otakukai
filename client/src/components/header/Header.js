import React, { useContext } from "react";
import { AppBar, Toolbar, Box, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { DataContext } from "../../context/DataProvider";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

const Component = styled(AppBar)`
  background-color: #64acac;
  color: #000;
  font-family: "Shadows Into Light", cursive;
`;

const Container = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > a {
    padding: 8px;
    color: inherit;
    text-decoration: none;
  }
`;

const Image = styled("img")({
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  border: "2px solid #000",
});

const Maintext = styled(Typography)`
  font-family: "Shadows Into Light", cursive;
  font-size: 40px;
  font-weight: bolder;
`;

const Header = () => {
  const { account } = useContext(DataContext);
  return (
    <Component>
      <Container>
        <Box>
          <Link to="/">
            <HomeIcon sx={{ fontSize: "30px" }} />
          </Link>
        </Box>
        <Box>
          <Maintext>otakukai</Maintext>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <AddIcon sx={{ fontSize: "30px" }} />
          <Link sx={{textDecration: "none"}} to={`/chatbar`}>
            <ChatIcon  sx={{ fontSize: "30px" }} />
          </Link>
          <Link to="/settings">
            <Image src={account.picture} alt="user" />
          </Link>
        </Box>
      </Container>
    </Component>
  );
};

export default Header;
