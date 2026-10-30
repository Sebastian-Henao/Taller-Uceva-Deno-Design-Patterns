import { COLORS } from "../../../helpers/colors.ts";

class DispensadorTurnos {
    static instancie: DispensadorTurnos;
    private ultimoTurno: number;

    private constructor() {
        this.ultimoTurno = 0;
    }

    public static getInstancia(): DispensadorTurnos {
        if (!DispensadorTurnos.instancie) {
            DispensadorTurnos.instancie = new DispensadorTurnos();
            console.log('%cCreación del Dispensador de Turnos', 'color: green');
        }
        return DispensadorTurnos.instancie;
    }

    public siguienteTurno() {
        this.ultimoTurno++;
        return `A-${this.ultimoTurno.toString().padStart(3, '0')}`;
    }

    public totalTurnos() {
        return this.ultimoTurno;
    }
}

function main() {
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