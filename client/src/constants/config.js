// API Notification Message

export const API_NOTIFICATION_MESSAGE = {
  loading: {
    title: "Loading...",
    message: "Data is loading, please wait!",
  },
  success: {
    title: "Success...",
    message: "Data loaded succesfully",
  },
  responseFailure: {
    title: "Error...",
    message: "Error in fetching response",
  },
  requestFailure: {
    title: "Error...",
    message: "Error in parsing request",
  },
  networkError: {
    title: "Error...",
    message: "Unable to connect to the server",
  },
};

// API Service Call

export const SERVICE_URLS = {
  userSignup: {
    url: "/signup",
    method: "POST",
  },
  userLogin: {
    url: "/login",
    method: "POST",
  },
  uploadFile: {
    url: "file/upload",
    method: "POST",
  },
  createPost: {
    url: "create",
    method: "POST",
  },
  getAllPosts: {
    url: "/posts",
    method: "GET",
    params: true,
  },
  getPostById: {
    url: "post",
    method: "GET",
    query: true,
  },
  updatePost: {
    url: "/update",
    method: "PUT",
    query: true,
  },
  deletePost: {
    url: "/delete",
    method: "DELETE",
    query: true,
  },
  newComment: {
    url: "/comment/new",
    method: "POST",
  },
  getAllComments: {
    url: "comments",
    method: "GET",
    query: true,
  },
  deleteComment: {
    url: "comment/delete",
    method: "DELETE",
    query: true,
  },
  updateComment: {
    url: "comment/update",
    method: "PUT",
    query: true,
  },
  updateEienyo: {
    url: "/updateeienyo",
    method: "PUT",
    query: true,
  },
  updateName: {
    url: "/updatename",
    method: "PUT",
    query: true,
  },
  getProfile: {
    url: "profile",
    method: "GET",
    query: true,
  },
  uploadUserPicture: {
    url: "user/file/upload",
    method: "POST",
  },
  getMessage: {
    url: "user/get/message/:sender/receiver",
    method: "GET",
    params: true
  },
  sendMessage: {
    url: "user/send/message",
    method: "POST",
  }








  // for oauth
  // googleLogin: {
  //   url: "auth/add",
  //   method: "POST",
  // }
};
