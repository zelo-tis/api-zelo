import PatientModal from './patient.model'
class DashboardModel {

  public async getListRegistry(){
    const patients = await PatientModal.getAll();
    return patients;

  }

}
export default new DashboardModel();
