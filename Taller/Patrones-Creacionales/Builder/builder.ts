import { COLORS } from '../../../helpers/colors.ts';

/**
 * Patrón de diseño: Builder
 * Tema para el taller: construcción de itinerarios de viaje
 *
 * ¿Qué hace el patrón?
 * Permite construir un objeto paso a paso, configurando sus partes
 * opcionales mediante una interfaz clara.
 *
 * ¿Qué problema se resuelve?
 * Un itinerario puede tener destino, duración, transporte, alojamiento y
 * varias actividades. Construirlo con muchos parametros obligatorios haria
 * difícil entender cada combinación y mantener el código.
 *
 * ¿Por qué Builder es adecuado para este problema?
 * Cada método configura una parte del viaje y devuelve el mismo builder,
 * por lo que se pueden crear itinerarios diferentes sin llenar el constructor
 * de parámetros ni cambiar la clase que representa el plan.
 */

/** Plan de viaje ya construido, listo para consultar y mostrar. */
class Itinerario {
  private readonly destino: string;
  private readonly duracionDias: number;
  private readonly transporte: string;
  private readonly alojamiento: string;
  private readonly actividades: readonly string[];

  constructor(
    destino: string,
    duracionDias: number,
    transporte: string,
    alojamiento: string,
    actividades: readonly string[],
  ) {
    this.destino = destino;
    this.duracionDias = duracionDias;
    this.transporte = transporte;
    this.alojamiento = alojamiento;
    this.actividades = actividades;
  }

  mostrarResumen(): void {
    console.log(`Destino: ${this.destino}`);
    console.log(`Duración: ${this.duracionDias} días`);
    console.log(`Transporte: ${this.transporte}`);
    console.log(`Alojamiento: ${this.alojamiento}`);
    console.log(
      `Actividades: ${this.actividades.join(', ') || 'Sin actividades'}`,
    );
  }
}

/** Construye itinerarios configurando opcionalmente cada detalle del viaje. */
class ItinerarioBuilder {
  private destino = '';
  private duracionDias = 0;
  private transporte = 'Por definir';
  private alojamiento = 'Por definir';
  private actividades: string[] = [];

  establecerDestino(destino: string): ItinerarioBuilder {
    this.destino = destino.trim();
    return this;
  }

  establecerDuracion(dias: number): ItinerarioBuilder {
    this.duracionDias = dias;
    return this;
  }

  establecerTransporte(transporte: string): ItinerarioBuilder {
    this.transporte = transporte;
    return this;
  }

  establecerAlojamiento(alojamiento: string): ItinerarioBuilder {
    this.alojamiento = alojamiento;
    return this;
  }

  agregarActividad(actividad: string): ItinerarioBuilder {
    this.actividades.push(actividad);
    return this;
  }

  build(): Itinerario {
    if (!this.destino) {
      throw new Error('El destino del itinerario es obligatorio.');
    }

    if (!Number.isInteger(this.duracionDias) || this.duracionDias <= 0) {
      throw new Error('La duración debe ser un número entero mayor que cero.');
    }

    return new Itinerario(
      this.destino,
      this.duracionDias,
      this.transporte,
      this.alojamiento,
      [...this.actividades],
    );
  }
}

function main(): void {
  const viajeCultural = new ItinerarioBuilder()
    .establecerDestino('Cartagena')
    .establecerDuracion(4)
    .establecerTransporte('Bus')
    .establecerAlojamiento('Hotel en el centro historico')
    .agregarActividad('Recorrido por la ciudad amurallada')
    .agregarActividad('Visita al Castillo de San Felipe')
    .build();

  const viajeDeNaturaleza = new ItinerarioBuilder()
    .establecerDestino('Salento')
    .establecerDuracion(2)
    .establecerTransporte('Automovil')
    .agregarActividad('Caminata por el Valle de Cocora')
    .build();

  console.log('%cItinerario cultural', COLORS.blue);
  viajeCultural.mostrarResumen();

  console.log('\n%cItinerario de naturaleza', COLORS.green);
  viajeDeNaturaleza.mostrarResumen();
}

main();
