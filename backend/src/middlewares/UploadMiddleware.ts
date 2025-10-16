import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";

const uploadDir = "src/uploads/avatars";
console.log("Upload dir absolute:", path.resolve(uploadDir));
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Request['file'], cb: DestinationCallback) => {
    cb(null, uploadDir);
  },
  filename: (_req: Request, file: Express.Request['file'], cb: FilenameCallback) => {
    if (!file) {
      return cb(new Error("Fichier manquant"), "unknown");
    }
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (_req: Request, file: Express.Request['file'], cb: FileFilterCallback) => {
  if (!file) {
    return cb(new Error("Fichier manquant"));
  }
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées"));
  }
};

export const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } 
});
export const uploadAvatar = upload.single("avatar");
