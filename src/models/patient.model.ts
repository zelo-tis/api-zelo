import { PatientInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import TreatmentModel from "./treatment.model";
import PatientRestrictionModel from "./patient-restriction.model";

export class User extends Model<PatientInterface> {
  public id?: number;

  public languages?: number[];

  public userProject?: number[];

  constructor() {
    const columns = [
      'id',
      'name',
      'attendance_number AS attendanceNumber',
      'braden',
      'observation',
      'bed_id AS bedId',
      'hospitalization',
      'movement_frequency_id AS movementFrequencyId'
    ];

    super('patient', columns);
  }


  public async getPatientActualTreatments(where?: any, renameColumns = true) {
    const treatments = await TreatmentModel.getAll();
    const patientRestrictions = await PatientRestrictionModel.getPatientTreatmentsRestrictions(where);

    return treatments.filter(
      (treatment) =>
      !patientRestrictions.some(
        (patientRestriction) => patientRestriction.treatment_id === treatment.id))
  }
}

export default new User();
