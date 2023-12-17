import "./App.css";
import { DataProvider } from "./context/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";


// components
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import Postview from "./components/home/post/Postview";
import UpdatePost from "./components/create/UpdatePost";
import Settings from "./components/setting/Settings";
import Profile from "./components/profile/Profile";
import Chat from "./components/chat/Chat.js";
import Chatbar from "./components/chat/Chatbar.js";


const PrivateRoute = ({ authentication, ...props }) => {
  return authentication ? (
    <>
        <Header />
        <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [authentication, setAuthentication] = useState(false);

  return (
    <GoogleOAuthProvider clientId="501707196549-pq48n0k3suhorr2s5shj4aioijlkkfb8.apps.googleusercontent.com">
      <DataProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route
                path="/login"
                element={<Login setAuthentication={setAuthentication} />}
              />
              <Route
                path="/"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/" element={<Home />} />
              </Route>
              <Route
                path="/create"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/create" element={<CreatePost />} />
              </Route>
              <Route
                path="/details/:id"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/details/:id" element={<Postview />} />
              </Route>
              <Route
                path="/update/:id"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/update/:id" element={<UpdatePost />} />
              </Route>
              <Route
                path="/settings"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route
                path="/userprofile/:username"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/userprofile/:username" element={<Profile />} />
              </Route>
              <Route
                path="/chat/:username"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/chat/:username" element={<Chat />} />
              </Route>
              <Route
                path="/chatbar"
                element={<PrivateRoute authentication={authentication} />}
              >
                <Route path="/chatbar" element={<Chatbar />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
