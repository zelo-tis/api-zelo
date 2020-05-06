import express from 'express';
import user from './user.route';
import dashboard from './dashboard.route';
import changeRecord from './change-record.route';
import restriction from './restriction.routes';
import patient from './patient.route';
import patientRestriction from './patient-restriction.route';
import patientMonitoring from './patient-monitoring.route';
const cors = require('cors');

export default (app: express.Application) => {
  app.use(cors());
  app.use('/user', user);
  app.use('/dashboard', dashboard);
  app.use('/restriction', restriction);
  app.use('/change-record', changeRecord);
  app.use('/patient', patient);
  app.use('/patient-restriction', patientRestriction);
  app.use('/patient-monitoring', patientMonitoring);
};
