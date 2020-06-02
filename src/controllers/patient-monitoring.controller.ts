import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import PatientMonitoringModel from '../models/patient-monitoring.model';
import ChangeRecordModel from '../models/change-record.model';
import dataTransformation from '../common/data-transformations/patient-monitoring.transformation';
import moment from 'moment';
import {DATE_FORMAT} from '../common/constants';


class PatientMonitoringController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = dataTransformation(req.body);

      const [id] = await PatientMonitoringModel.insert({...data, active: true});

      const response = await PatientMonitoringModel.getOne({id});
      if(response){
        response.updateNextRecord =  await ChangeRecordModel.updateNextRecords({patient_id: response.patient_id});
      }
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const id = this.getIdFromRequestParams(req);
      const data = dataTransformation(req.body);

      if(data.active){
        data.start_date = moment().format(DATE_FORMAT.DEFAULT_TIME)
      }
      await PatientMonitoringModel.update({ id }, data);

      const response = await PatientMonitoringModel.getOne({ id });
      if(response){
        response.updateNextRecord =  await ChangeRecordModel.updateNextRecords({patient_id: response.patient_id});
      }
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const oldPatientMonitoring = await PatientMonitoringModel.getOne({ id });
      const response = await PatientMonitoringModel.delete({ id });

      if(response){
         await ChangeRecordModel.updateNextRecords({patient_id: oldPatientMonitoring.patient_id});
      }
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const where = dataTransformation(req.query);
      const response = await PatientMonitoringModel.list(where);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);

      const response = await PatientMonitoringModel.getOne({id});
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}
export default new PatientMonitoringController();
