import bodyParser from 'body-parser';
import express from 'express';
import apiRoutes from './routes';
import changeRecordJob from "./common/jobs/create-change-records.job";

class App {
    public express: express.Application;

    constructor() {
      this.express = express();
      this.middleware();
      this.routes();
      this.jobs();
    }

    private middleware() {
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes() {
      apiRoutes(this.express);
    }

    private jobs() {
      changeRecordJob();
    }
}

export default new App().express;
