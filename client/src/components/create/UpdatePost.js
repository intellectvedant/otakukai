import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import banner from "../../images/banner.jpg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({theme})=>({
    margin: '64px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '64px 3px'
    }
}))

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Styledformcontrol = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const Inputtextfield = styled(InputBase)`
  flex: 1;
  margin: 0px 30px;
  font-size: 19px;
`;

const Textaarea = styled(TextareaAutosize)`
  width: 99%;
  margin-top: 20px;
  font-size: 15px;
  border-radius: 12px;
  padding: 7px;
`;
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const { account } = useContext(DataContext);
  const Navigate = useNavigate();
    const {id} = useParams();

  useEffect(() => {
    const fetchData = async()=>{
        let response = await API.getPostById(id)
        if(response.isSuccess){
            setPost(response.data)
        }
    }
    fetchData();
  }, [])
  

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        console.log("FormData:", data);
        const response = await API.uploadFile(data);
        // post.picture = response.data
        setPost({...post , picture : response.data})
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const postValueChange = (e) => {
    let updatedPost = { ...post, [e.target.name]: e.target.value };
    setPost(updatedPost);
    console.log(updatedPost);
  };

  const updatePost = async()=>{
    const response = await API.updatePost(post);
    if(response.isSuccess){
      Navigate(`/details/${id}`)
    }
  }

  return (
    <Container>
      <Image src={post.picture ? post.picture : banner} />
      <Styledformcontrol>
        <label htmlFor="fileInput">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            console.log("Selected File:", selectedFile);
            setFile(selectedFile);
          }}
        />
        <Inputtextfield
          placeholder="Title"
          onChange={(e) => postValueChange(e)}
          name="title"
          value={post.title}
        />
        <Button variant="contained" onClick={()=>updatePost()}>Update</Button>
      </Styledformcontrol>
      <Textaarea
        minRows={5}
        placeholder="Description"
        onChange={(e) => postValueChange(e)}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default UpdatePost;
