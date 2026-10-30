import { COLORS } from "../../../helpers/colors.ts";

/**
 * Patron de diseño: Singleton
 * Tema para el taller: Turnos en EPS
 * 
 * ¿Que hace el patron? 
 * Garantiza que una clase tenga una única instancia 
 * y proporciona un punto de acceso global a ella.
 * 
 * ¿Que problema se resuelve?
 * En una EPS hay varios dispensadores que dan turnos.
 * Si cada una creara su propio contador, dos pacientes distintos
 * podrían recibir el mismo número de turno, por lo que necesitamos 
 * un solo contador compartido.
 * 
 * ¿Porque el patron Singleton es adecuado para este problema?
 * Porque los dispensadores deben compartir el mismo contador para los turnos,
 * debido a que si esto no se cumple, dos pacientes distintos podrían recibir el mismo número de turno.
 * Con el patron Singleton, se garantiza que todos los dispensadores compartan la misma instancia de la clase 
 * "DispensadorTurnos", lo que asegura que el contador de turnos sea único
 */

class DispensadorTurnos {
    /** Se guarda la unica instancia de la clase "DispensadorTurnos" */
    static instancie: DispensadorTurnos;

    /** Ultimo turno entregado, esto se comparte */
    private ultimoTurno: number;

    /** Constructor privado para evitar que se generen instancias externas */
    private constructor() {
        this.ultimoTurno = 0;
    }

    /** Se crea la instancia unica, siempre que este creada y se llame al metodo,
     * devolverra la misma
     */
    public static getInstancia(): DispensadorTurnos {
        if (!DispensadorTurnos.instancie) {
            DispensadorTurnos.instancie = new DispensadorTurnos();
            console.log('%cCreación del Dispensador de Turnos', 'color: green');
        }
        return DispensadorTurnos.instancie;
    }

    /** Creacion y entrega del siguiente turno */
    public siguienteTurno() {
        this.ultimoTurno++;
        return `A-${this.ultimoTurno.toString().padStart(3, '0')}`;
    }

    /** Consulta el total de turnos entregados */
    public totalTurnos() {
        return this.ultimoTurno;
    }
}

function main() {

    /** Se instancia cada dispensador pero siempre se devuelve la misma */
    const dispensador1 = DispensadorTurnos.getInstancia();
    const dispensador2 = DispensadorTurnos.getInstancia();
    const dispensador3 = DispensadorTurnos.getInstancia();

    console.log('%cComienza a llegar los pacientes', COLORS.yellow);
    console.log('Dispensador 1 entrega el turno:', dispensador1.siguienteTurno());
    console.log('Dispensador 2 entrega el turno:', dispensador2.siguienteTurno());
    console.log('Dispensador 3 entrega el turno:', dispensador3.siguienteTurno());
    console.log('Dispensador 1 entrega el turno:', dispensador1.siguienteTurno());
    console.log('Total de turnos entregados: ', DispensadorTurnos.getInstancia().totalTurnos());
}

main();