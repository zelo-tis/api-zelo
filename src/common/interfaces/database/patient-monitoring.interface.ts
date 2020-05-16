export interface PatientMonitoringInterface {
  id?: number;
  start_date?: string;
  end_date?: string;
  observation?: string;
  active?: boolean;
  patient_id?: number;
  movement_frequency_id?: number;
  contact_restriction?: boolean;
  bed_id?: number;
}
