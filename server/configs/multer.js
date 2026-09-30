import fs from "fs";
import os from "os";
import path from "path";
import multer from "multer";

// Serverless hosts (Vercel) only allow writes under the OS temp dir
const uploadFolder = path.join(os.tmpdir(), "uploads");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
