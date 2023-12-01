import React, {useContext} from "react";
import { AppBar, Toolbar, Box, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { DataContext } from "../../context/DataProvider";

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
  width: "50px",
  height: "50px",
  borderRadius: "52px",
});

const Maintext = styled(Typography)`
  font-family: "Shadows Into Light", cursive;
  font-size: 40px;
  font-weight: bolder;
`;

const Header = () => {
  const {account} = useContext(DataContext)
  return (
    <Component>
      <Container>
        <Box>
          <Link to="/">
            <HomeIcon />
          </Link>
        </Box>
        <Box>
          <Maintext>otakukai</Maintext>
        </Box>
        <Box>
          <Link to="/settings">
            <Image src={account.picture} alt="user" />
          </Link>
        </Box>
      </Container>
    </Component>
  );
};

export default Header;
