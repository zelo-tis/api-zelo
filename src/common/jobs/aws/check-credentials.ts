/* eslint-disable no-console */
import AWS from 'aws-sdk';

AWS.config.getCredentials((err) => {
  if (err) console.log(err.stack);
  else if (AWS.config.credentials) {
    console.log('Access key:', AWS.config.credentials.accessKeyId);
    console.log('Secret access key:', AWS.config.credentials.secretAccessKey);
    console.log("Region: ", AWS.config.region);
  }
});
