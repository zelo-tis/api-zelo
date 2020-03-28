import S3 from 'aws-sdk/clients/s3';
import CONFIG from '../../config';

export default class AWSS3 {
  private s3: S3;

  constructor() {
    this.s3 = this.getS3Object();
  }

  private getS3Object() {
    const data: S3.Types.ClientConfiguration = {
      accessKeyId: CONFIG.aws.credentials.accessKeyId,
      secretAccessKey: CONFIG.aws.credentials.secretAccessKey,
      endpoint: CONFIG.aws.s3.endpoint,
      signatureVersion: 'v4'
    };

    if (process.env.NODE_ENV === 'development') {
      data.s3ForcePathStyle = true;
    }

    return new S3(data);
  }

  public createBucket() {
    return this.s3
      .createBucket({ Bucket: CONFIG.aws.s3.bucket })
      .promise();
  }

  public deleteBucket() {
    return this.s3
      .deleteBucket({ Bucket: CONFIG.aws.s3.bucket })
      .promise();
  }

  public upload(params: S3.Types.PutObjectRequest): Promise<S3.ManagedUpload.SendData> {
    return this.s3
      .upload(params)
      .promise();
  }

  public deleteObject(key: string): Promise<S3.DeleteObjectOutput> {
    return this.s3
      .deleteObject({ Bucket: CONFIG.aws.s3.bucket, Key: key })
      .promise();
  }

  public deleteObjects(params: S3.Types.DeleteObjectsRequest): Promise<S3.Types.DeleteObjectsOutput> {
    return this.s3
      .deleteObjects(params)
      .promise();
  }
}
