import schedule from 'node-schedule';
import ChangeRecordModel from '../../models/change-record.model';

const changeRecordJob = async () => {
  schedule.scheduleJob('* 0 * * *', async () => {
    console.log('Job Next Change Records is running');
    await ChangeRecordModel.generateChangeRecords();
    console.log('Job Next Change Records  finished');
  });
};

export default changeRecordJob;
