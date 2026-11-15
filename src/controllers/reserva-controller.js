import { ReservaModel } from '../models/reserva-model.js';
import { ReservaView } from '../views/reserva-view.js';

export class ReservaController {
  constructor(modelo, vista) {
    this.modelo = modelo;
    this.vista = vista;
    vista.cargarOpciones(modelo.especialidades, modelo.horarios, modelo.fechaMinima());
    vista.vincularEnvio(datos => vista.mostrarResultado(datos, modelo.validar(datos)));
    vista.vincularEspecialidad(valor => {
      if (modelo.especialidades.includes(valor)) vista.seleccionarEspecialidad(valor);
    });
  }
}

new ReservaController(new ReservaModel(), new ReservaView());
