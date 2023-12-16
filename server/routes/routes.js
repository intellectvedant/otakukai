import express from "express";
import {
  signupuser,
  loginuser,
  updateeienyo,
  updatename,
  getprofile,
} from "../controller/user-controller.js";
import {
  uploadimage,
  getimage,
  uploaduserimage,
} from "../controller/image-controller.js";
import upload from "../utils/upload.js";
import {
  createpost,
  getallposts,
  getpost,
  updatepost,
  deletepost,
} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import {
  newcomment,
  getallcomment,
  updatecomment,
  deletecomment,
} from "../controller/comment-controller.js";
import { body, validationResult } from "express-validator";
import { getMessage, sendMessage } from "../controller/message_controller.js";

const router = express.Router();

// Define your routes
router.post(
  "/signup",
  [
    body("name", "Enter a valid value").isLength({ min: 3 }),
    body("username", "Enter valid value").isLength({ min: 3 }),
    body("eienyo", "Enter valid Eienyo").isLength({ min: 10 }),
    body("password", "Enter a valid password").isLength({ min: 7 }),
  ],
  signupuser
);
router.post(
  "/login",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("passowrd", "Passowrd cannot be empty").exists(),
  ],
  loginuser
);
router.post("/file/upload", upload.single("file"), uploadimage);
router.get("/file/:filename", getimage);
router.post("/create", authenticateToken, createpost);
router.get("/posts", authenticateToken, getallposts);
router.get("/post/:id", authenticateToken, getpost);
router.put("/update/:id", authenticateToken, updatepost);
router.delete("/delete/:id", authenticateToken, deletepost);
router.post("/comment/new", authenticateToken, newcomment);
router.get("/comments/:id", authenticateToken, getallcomment);
router.put("/comment/update/:id", authenticateToken, updatecomment);
router.delete("/comment/delete/:id", authenticateToken, deletecomment);
router.put("/updateeienyo/:id", authenticateToken, updateeienyo);
router.put("/updatename/:id", authenticateToken, updatename);
router.get("/profile/:username", authenticateToken, getprofile);
router.post("/user/file/upload", upload.single("file"), uploaduserimage);
router.post("/user/send/message", authenticateToken, sendMessage);
router.get("/user/get/message/:sender/:receiver", authenticateToken, getMessage)

export default router;
