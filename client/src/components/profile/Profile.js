import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { API } from "../../service/api";

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

const Profilebox = styled(Box)`
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

const Image = styled("img")({
  width: "230px",
  height: "230px",
  borderRadius: "52px",
});

const Profile = () => {
  const { username } = useParams();
  const [data, setData] = useState("");
  const [isMounted, setIsMounted] = useState(true);
 

  console.log(username);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getProfile(username);
      if (isMounted && response.isSuccess) {
        console.log(response.data);
        setData(response.data);
      }
    };
    fetchData();

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, username]);

  return (
    <Container>
      <Profilebox>
        <SubProfilebox
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            alignItems: "center",
          }}
        >
          <Image src={data.picture} alt="user" />
          <Styledbox>
            <Link to={`/chat/${data.username}`}>
            <Button>Chat</Button>
            </Link>
          </Styledbox>
        </SubProfilebox>
        <SubProfilebox>
          <Styledbox>Shikigami : {data.username}</Styledbox>
          <Styledbox>
            <Typography>Name : {data.name}</Typography>
          </Styledbox>
          <Styledtextbox>
            <Typography>Eienyō (永遠引用)</Typography>
            <Typography>{data.eienyo}</Typography>
          </Styledtextbox>
        </SubProfilebox>
      </Profilebox>
    </Container>
  );
};

export default Profile;
