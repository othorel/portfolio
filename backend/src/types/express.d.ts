import 'express';
import { File as MulterFile } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: number; role: string };
      file?: MulterFile;
      files?: MulterFile[];
    }
  }
}
