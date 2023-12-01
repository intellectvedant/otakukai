import React, { useContext, useState, useEffect } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import Mobileloginvideo from "../../images/Mobileloginvideo.mp4";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import mainbg from "../../images/mainbg.jpg";

const Container = styled(Box)({
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${mainbg})`, // Set the background image
    backgroundSize: "cover", // Ensure the background image covers the entire container
    backgroundRepeat: "no-repeat",
    opacity: 0.5,
    zIndex: -1,
  },
});

// ...

const Mainbox = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent", // Set the background color to transparent
  border: "1px solid #000",
  height: "500px", // Set a fixed height
  width: "1100px", // Set a fixed width
  margin: "10% auto", // Center the Mainbox vertically and horizontally
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    margin: "0px",
    height: "auto",
    width: "auto",
  },
}));

const Leftbox = styled(Box)(({ theme }) => ({
  flex: 2,
  backgroundColor: "red",
  [theme.breakpoints.down("md")]: {
    height: "50%",
  },
}));

const Videobox = styled("video")(({ theme }) => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    objectFit: "scale-down",
  },
}));

const Rightbox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to bottom right, #8bb9c4, #3c4c39)",
  flex: 1.5,
  borderRadius: "100% 0 0 100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    borderRadius: 0,
  },
}));

const Rightdiv = styled(Box)`
  padding: 15px;
`;

const Rightboxtext = styled(Typography)`
  font-weignt: bolder;
  color: #fff;
`;

const Component = styled(Box)(({ theme }) => ({
  flex: 2,
  backgroundColor: "transparent",
  overflow: "auto", // Set to "auto" to enable scrolling
  position: "relative",
  padding: "30px 50px",
  maxHeight: "100%", // Set a max height for the scrolling
  [theme.breakpoints.down("md")]: {
    maxHeight: "auto", // Adjust for smaller screens
    padding: "3px 3px",
  },
  "&::-webkit-scrollbar": {
    width: 0, // Set the width of the scrollbar to 0
    background: "transparent", // Set the background color of the scrollbar to transparent
  },
  scrollbarWidth: "none",
}));

const Maintext = styled(Typography)`
  font-family: "Shadows Into Light", cursive;
  font-size: 50px;
  font-weight: bolder;
  width: 100%;
  display: flex;
  margin: auto;
  padding: 20px 0 0 0;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// const Authbox = styled(Box)`
//   width: 100%;
//   display: flex;
//   margin: auto;
//   padding: 20px 0 0 0;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
// `;


const Wrapper = styled(Box)`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  font-family: "Baloo 2", sans-serif;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Imagebox = styled("label")`
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  background: #ac6464;
  color: #fff;
  border-radius: 12px;
  height: 35px;
  font-family: "Baloo 2", sans-serif;
  padding: 3px;
  &:hover {
    background-color: #1565c0;
  }
`;

const ImageTypography = styled(Typography)`
  margin: 7px;
  font-family: "Baloo 2", sans-serif;
`;

const Mainbutton = styled(Button)`
  text-transform: none;
  background: #64acac;
  color: #fff;
  border-radius: 12px;
  height: 35px;
  font-family: "Baloo 2", sans-serif;
`;

const Rightbutton = styled(Button)`
  text-transform: none;
  border-radius: 12px;
  height: 35px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
  background-color: #fff;
  font-family: "Baloo 2", sans-serif;
  &:hover {
    background-color: #e8cfc9;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: red;
  line-height: 0;
  margin-top: 10px;
  font-weight: 700;
  font-family: "Baloo 2", sans-serif;
`;
// signupInitialvalues

const signupInitialvalues = {
  name: "",
  username: "",
  eienyo: "",
  password: "",
  picture: "",
};

// loginInitialvalues

const loginInitialvalues = {
  username: "",
  password: "",
};

const Login = ({ setAuthentication }) => {
  const { updateEienyo, updateName, updatePicture } = useData();
  const [toggle, setToggle] = useState("login");
  const [signup, setSignup] = useState(signupInitialvalues);
  const [login, setLogin] = useState(loginInitialvalues);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const { setAccount } = useContext(DataContext);
  const [file, setFile] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {

    const savedUsername = localStorage.getItem("savedUsername")
    const savedPassword = localStorage.getItem("savedPassword")


    if(savedUsername && savedPassword){
      setLogin({
        ...login,
        username: savedUsername,
        password: savedPassword,
      });
    }

  }, [])
  

  useEffect(() => {
    const getImage = async () => {
      console.log(file);
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        console.log("FormData:", data);
        try {
          const response = await API.uploadUserPicture(data);
          setSignup({ ...signup, picture: response.data });
        } catch (error) {
          console.error("Error uploading picture:", error);
        }
      }
    };
    getImage();
  }, [file]);

  const toggleAccount = () => {
    {
      toggle === "login" ? setToggle("signup") : setToggle("login");
    }
  };

  // Sign Up Section

  const onInputChange = (e) => {
    const updatedSignup = { ...signup, [e.target.name]: e.target.value };
    setSignup(updatedSignup);
    console.log(updatedSignup);
  };

  const signUpUser = async () => {
    // Check for validation errors before making the API call

    if (
      signup.name.length < 3 
    ) {
      setSignupError("Validation Error: Name must be at least 3 characters long.");
      return;
    }
    if (
      signup.username.length < 3 
    ) {
      setSignupError("Validation Error: Username must be at least 3 characters long.");
      return;
    }
    if (

      signup.eienyo.length < 10 

    ) {
      setSignupError("Validation Error: Eienyo must be at least 10 characters long.");
      return;
    }
    if (
      signup.password.length < 7
    ) {
      setSignupError("Validation Error: Password must be at least 3 characters long.");
      return;
    }

    try {
      let response = await API.userSignup(signup);
      console.log(response);
      if (response.isSuccess) {
        setSignupError("");
        setSignup(signupInitialvalues);
        setToggle("login");
      }
    } catch (error) {
      setSignupError("Error in signup");
    }
  };

  // Login Section

  const onValueChange = (e) => {
    const updatedLogin = { ...login, [e.target.name]: e.target.value };
    setLogin(updatedLogin);
  };

  const loginUser = async () => {

    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {

        localStorage.setItem("savedUsername" , login.username)
        localStorage.setItem("savedPassword", login.password)
        setLoginError("");
        setLogin(loginInitialvalues);

        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );

        console.log(response.body);

        setAccount({
          _id: response.data._id,
          name: response.data.name,
          username: response.data.username,
          eienyo: response.data.eienyo,
          picture: response.data.picture,
        });
        updateEienyo(response.data.eienyo);
        updateName(response.data.name);
        updatePicture(response.data.picture);

        setAuthentication(true);
        Navigate("/");
      }
    } catch (error) {
      setLoginError("Authentication failed. Please check your credentials and try again.");
    }
  };

  // for oauth

  // const onLoginSuccess = async (res) => {
  //   const decode = jwtDecode(res.credential);
  //   const response = await API.googleLogin(decode);
  //   if (response.isSuccess) {
  //     console.log(decode);

  //     sessionStorage.setItem(
  //       "accessToken",
  //       `Bearer ${response.data.accessToken}`
  //     );
  //     sessionStorage.setItem(
  //       "refreshToken",
  //       `Bearer ${response.data.refreshToken}`
  //     );

  //     setAuthentication(true);

  //     Navigate("/")
  //   }
  // };
  // const onLoginError = (res) => {
  //   console.error(error);
  // };

  return (
    <Container>
      <Mainbox>
        <Leftbox>
          <Videobox autoPlay loop muted>
            <source src={Mobileloginvideo} type="video/mp4" />
          </Videobox>
        </Leftbox>
        <Component>
          {/* <Image src={vraqlogo} alt="vraqlogo" /> */}
          <Maintext>otakukai</Maintext>
          {/* <Authbox>
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Authbox> */}
          {toggle === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="username"
                label="Shikigami (Username)"
                value={login.username}
                autoComplete="current-password"
              />
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Password"
                value={login.password}
                type="password"
                autoComplete="current-password"
                helperText={
                  login.password < 1 ? "Password must not be empty." : ""
                }
              />
              {loginError && <Error>{loginError}</Error>}
              <Mainbutton variant="contained" onClick={() => loginUser()}>
                Login
              </Mainbutton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="name"
                label="Name"
                value={signup.name}
                InputProps={{ minLength: 3 }}
                helperText={
                  signup.name.length < 3
                    ? "Name must be at least 3 characters long."
                    : ""
                }
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="username"
                label="Shikigami (Username)"
                value={signup.username}
                InputProps={{ minLength: 3 }}
                helperText={
                  signup.username.length < 3
                    ? "Shikigami, your anime alter ego, craves uniqueness! 3 characters or more, let the legend begin!"
                    : ""
                }
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="eienyo"
                label="Eienyo"
                type="text"
                value={signup.eienyo}
                InputProps={{ minLength: 10 }}
                helperText={
                  signup.eienyo.length < 10
                    ? "Eienyo, an amalgamation of '永遠' (eien) and '陰陽' (inyo), encapsulates the timeless essence of anime wisdom. Kindly ensure it comprises a minimum of 10 characters."
                    : ""
                }
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Password"
                type="password"
                InputProps={{ minLength: 7 }}
                helperText={
                  signup.password.length < 7
                    ? "Password must be atleast & characters long."
                    : ""
                }
              />
              {/* <Image style={{display: "none"}} src={signup.picture ? signup.picture : user1} /> */}
              <Imagebox variant="contained" htmlFor="fileInput">
                <ImageTypography>Upload Picture</ImageTypography>
                <AddCircleIcon fontSize="medium" color="action" />
              </Imagebox>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => {
                  const selectedFiles = e.target.files[0];
                  console.log({ "selected File": selectedFiles });
                  setFile(selectedFiles);
                }}
              />
              {signupError && <Error>{signupError}</Error>}
              <Mainbutton variant="contained" onClick={() => signUpUser()}>
                Sign Up
              </Mainbutton>
            </Wrapper>
          )}
        </Component>
        <Rightbox>
          <Rightdiv>
            <Rightboxtext style={{ fontSize: 20 }}>
              {toggle === "login"
                ? "Become a Shikigami Now!"
                : "Already a Shikigami?"}
            </Rightboxtext>
            <Wrapper>
              <Rightbutton onClick={() => toggleAccount()}>
                {toggle === "login" ? "Sign Up" : "Log In"}
              </Rightbutton>
            </Wrapper>
          </Rightdiv>
        </Rightbox>
      </Mainbox>
    </Container>
  );
};

export default Login;
