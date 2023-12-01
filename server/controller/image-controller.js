import grid from "gridfs-stream";
import mongoose from "mongoose";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const url = "http://localhost:8000";
export const uploadimage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ msg: "File not found!" });
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
};

export const getimage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename});
    console.log("Requested filename:", req.params.filename);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
};


export const uploaduserimage = async(req,res) =>{
  try {
    if (!req.file) {
      return res.status(404).json({ msg: "File not found!" });
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
}

