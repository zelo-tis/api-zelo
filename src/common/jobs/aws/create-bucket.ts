/* eslint-disable no-console */
import AWSS3 from '../../utils/class/aws-s3';

new AWSS3().createBucket().then(console.log);
