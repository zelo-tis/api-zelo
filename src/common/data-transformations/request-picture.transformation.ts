import { RequestPictureInterface } from '../interfaces/database/request-picture.interface';

export default (body: any, requestId: number): RequestPictureInterface[] => {
  let pictures = [];

  if (Array.isArray(body.pictures)) {
    pictures = body.pictures.map((item: any) => ({
      request_id: requestId,
      url: item.url,
      transifex_id: item.transifexId
    }));
  }

  return pictures;
};
