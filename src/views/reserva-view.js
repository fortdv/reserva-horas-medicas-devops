export class ReservaView {
  constructor() {
    this.formulario = document.getElementById('reservation-form');
    this.resultado = document.getElementById('result');
    this.campos = Object.fromEntries(['patient', 'specialty', 'modality', 'date', 'time'].map(id => [id, document.getElementById(id)]));
  }

  cargarOpciones(especialidades, horarios, fechaMinima) {
    for (const valor of especialidades) this.campos.specialty.add(new Option(valor, valor));
    for (const valor of horarios) this.campos.time.add(new Option(valor, valor));
    this.campos.date.min = fechaMinima;
  }

  leerDatos() {
    const c = this.campos;
    return { paciente: c.patient.value.trim(), especialidad: c.specialty.value, modalidad: c.modality.value, fecha: c.date.value, hora: c.time.value };
  }

  mostrarResultado(datos, error) {
    this.resultado.replaceChildren();
    this.resultado.classList.toggle('error', Boolean(error));
    const titulo = document.createElement('strong');
    titulo.textContent = error ? 'Revisa la fecha o los datos' : 'Resumen de tu selección';
    const detalle = document.createElement('p');
    detalle.textContent = error || `${datos.especialidad} · ${datos.modalidad} · ${datos.fecha.split('-').reverse().join('/')} · ${datos.hora}`;
    this.resultado.append(titulo, detalle);
    if (!error) {
      const nota = document.createElement('p');
      nota.textContent = 'Esta selección no genera una cita real ni envía información.';
      this.resultado.append(nota);
    }
    this.resultado.hidden = false;
  }

  ocultarResultado() {
    this.resultado.hidden = true;
    this.resultado.replaceChildren();
  }

  vincularEnvio(callback) {
    this.formulario.addEventListener('submit', event => {
      event.preventDefault();
      if (this.formulario.reportValidity()) callback(this.leerDatos());
    });
    this.formulario.addEventListener('input', () => this.ocultarResultado());
  }

  vincularEspecialidad(callback) {
    document.querySelectorAll('[data-specialty]').forEach(enlace => {
      enlace.addEventListener('click', () => callback(enlace.dataset.specialty));
    });
  }

  seleccionarEspecialidad(valor) {
    this.campos.specialty.value = valor;
    this.ocultarResultado();
    this.campos.specialty.focus({ preventScroll: true });
  }
}
