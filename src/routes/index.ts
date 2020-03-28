import express from 'express';

import dashboard from './dashboad.route';

export default (app: express.Application) => {
  app.use('/dashboard', dashboard);
};
