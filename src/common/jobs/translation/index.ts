
import schedule from 'node-schedule';
import ControllerTransifex from '../../../controllers/transifex.controller';

const translationJobs = async () => {
  schedule.scheduleJob('* * * * *', async () => {
    console.log('Job Translation is running');
    await ControllerTransifex.runCheckRequestTranslationStatus();
    console.log('Job Translation finsh');
  });
};

export default translationJobs;
