import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
// import dotenv from 'dotenv'

// dotenv.config()
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url:  `mongodb+srv://vedant:vraqblog@vraqblog.helb17w.mongodb.net/?retryWrites=true&w=majority`,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpg", "image/jpeg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        return `${Date.now()}-otakukai-${file.originalname}`;
      }
  
      return {
        bucketname: "photos",
        filename: `${Date.now()}-otakukai-${file.originalname}`
      };
    }
  });
  


const upload = multer ({ storage});
export default upload;