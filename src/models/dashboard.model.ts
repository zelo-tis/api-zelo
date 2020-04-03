export class DashboardModel {

  public async getListRegistry(){
    const registry = [
      {
        id: 'AT01234512',
        bed: '01',
        error: 1,
        name: 'Flávio Cunha dos Santos',
        nextChange: 'Atrasado há 59 minutos',
        nextPosition: 'Dorsal',
        lastChange: 'Hoje às 12:29',
        braden: '16'
      },
      {
        id: 'AT01234514',
        bed: '02',
        name: 'Gabriela Nolasco',
        nextChange: 'Faltam 03 horas',
        nextPosition: 'Lateral esquerdo',
        lastChange: 'Hoje às 14:29',
        braden: '9'
      },
      {
        id: 'AT00534413',
        bed: '03',
        name: 'Victor de Souza',
        nextChange: 'Faltam 05 horas',
        nextPosition: 'Lateral direito',
        lastChange: 'Hoje às 14:00',
        braden: '19'
      },
      {
        id: 'AT01424532',
        bed: '04',
        error: 1,
        name: 'Pedro Mancini',
        nextChange: 'Atrasado há 1 hora',
        nextPosition: 'Dorsal',
        lastChange: 'Hoje às 14:00',
        braden: '20'
      },
      {
        id: 'AT01424544',
        bed: '06',
        name: 'Vitória Lima',
        nextChange: 'Faltam 2 horas',
        nextPosition: 'Lateral Direito',
        lastChange: 'Hoje às 15:00',
        braden: '18'
      },
      {
        id: 'AT04124544',
        bed: '07',
        name: 'Lucas Lima',
        nextChange: 'Faltam 3 horas',
        nextPosition: 'Lateral Direito',
        lastChange: 'Hoje às 15:00',
        braden: '23'
      },
      {
        id: 'AT01128590',
        bed: '05',
        name: 'Vanuza Juliana',
        nextChange: 'Faltam 3 horas',
        nextPosition: 'Dorsal',
        lastChange: 'Hoje às 15:00',
        braden: '19'
      }
      ];
    return registry;
  }

}
export default new DashboardModel();
