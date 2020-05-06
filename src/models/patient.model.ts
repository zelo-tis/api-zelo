import { PatientInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import TreatmentModel from "./treatment.model";
import PatientRestrictionModel from "./patient-restriction.model";

export class Patient extends Model<PatientInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'id',
      'name',
      'attendance_number',
      'braden',
      'observation'
    ];

    super('patient', columns);
  }

  public async getPatientActualTreatments(where?: any, renameColumns = true) {
    const treatments = await TreatmentModel.getAll();
    const patientRestrictions = await PatientRestrictionModel.getPatientTreatmentsRestrictions(where);
   const treatmentChange = treatments[3];
    return treatments.filter((t, index) => index !== 3).map(
      (treatment) => patientRestrictions.some(
        (patientRestriction) => patientRestriction.treatment_id === treatment.id)
      ? treatmentChange : treatment
    )
  }
}

export default new Patient();
