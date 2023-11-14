import { path } from 'app-root-path';
import { Express } from 'express';
import 'multer';
import { ensureDir, writeFile } from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export const fileUploadHelper = async (
  file: Express.Multer.File,
  folder: string,
) => {
  const uploadFolder =
    process.env.NODE_ENV === 'production'
      ? `${path}/assets/${folder}`
      : `${path}/apps/server/src/assets/${folder}`;

  console.log('uploadFolder: ', uploadFolder);

  await ensureDir(uploadFolder);

  const fileExtension = file.originalname.split('.')[1];

  const uploadedName = `${uuidv4()}.${fileExtension}`;

  await writeFile(`${uploadFolder}/${uploadedName}`, file.buffer);

  return `/assets/${folder}/${uploadedName}`;
};
