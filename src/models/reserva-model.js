export class ReservaModel {
  constructor() {
    this.especialidades = ['Medicina general', 'Pediatría', 'Dermatología'];
    this.horarios = ['09:00', '10:30', '12:00', '15:30'];
    this.modalidades = ['Presencial', 'Teleconsulta'];
  }

  fechaMinima() {
    const hoy = new Date();
    return [hoy.getFullYear(), String(hoy.getMonth() + 1).padStart(2, '0'), String(hoy.getDate()).padStart(2, '0')].join('-');
  }

  validar(datos) {
    if (!datos.paciente.trim() || datos.paciente.length > 40) return 'Ingresa un identificador de hasta 40 caracteres.';
    if (!this.especialidades.includes(datos.especialidad)) return 'Selecciona una especialidad válida.';
    if (!this.modalidades.includes(datos.modalidad)) return 'Selecciona una modalidad válida.';
    if (!this.horarios.includes(datos.hora)) return 'Selecciona un horario válido.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha) || datos.fecha < this.fechaMinima()) return 'Selecciona una fecha a partir de hoy.';
    const fecha = new Date(`${datos.fecha}T12:00:00`);
    if (Number.isNaN(fecha.getTime()) || [0, 6].includes(fecha.getDay())) return 'Selecciona una fecha de lunes a viernes.';
    return '';
  }
}
