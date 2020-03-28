import { v1 as uuid } from 'uuid';
import { RequestPictureInterface } from '../interfaces/database';
import CONFIG from '../config';
import AWSS3 from '../utils/class/aws-s3';
import { ServiceConnectionError } from './errors';

export const uploadPictures = async (request_id: number, files: Express.Multer.File[]): Promise<RequestPictureInterface[]> => {
  const s3 = new AWSS3();
  const id = uuid();

  const response = await Promise.all(files.map((picture) => (
    s3.upload({
      Bucket: `${CONFIG.aws.s3.bucket}/request_pictures/${request_id}`,
      ContentLength: picture.size,
      ContentType: picture.mimetype,
      Key: `${id}${picture.originalname}`,
      Body: picture.buffer
    })
  )))
    .catch((error) => {
      throw new ServiceConnectionError('', error);
    });

  const requestPictures = response.map((picture) => ({
    request_id,
    url: picture.Location,
    key: picture.Key
  }));

  return requestPictures;
};

export const deleteObject = (key: string) => {
  return new AWSS3().deleteObject(key);
};
