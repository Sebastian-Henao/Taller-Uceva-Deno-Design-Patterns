import { COLORS } from "../../../helpers/colors.ts";

interface Observer {
    actualizar(item: string, monto: number, nombrePostor: string): void;
}

class Subasta {
    private observadores: Observer[] = [];
    private mayorMonto: number;
    private mayorPostor: string = 'nadie';

    constructor(private item: string, montoInicial: number){
        this.mayorMonto = montoInicial;
        console.log(`%cSe ha iniciado una subasta por ${item} con un monto inicial de $${montoInicial}`, COLORS.green);
    }

    suscribirse(observador: Observer) {
        this.observadores.push(observador);
        console.log("%cSe ha unido un nuevo postor a la subasta", COLORS.blue);
    }

    desuscribirse(observador: Observer) {
        this.observadores = this.observadores.filter(obs => obs != observador);
        console.log("%cUn postor se ha retirado de la subasta", COLORS.red);
    }

    realizarPuja(nombrePostor: string, monto: number) {
        if (monto <= this.mayorMonto) {
            console.log(`%cLa oferta de ${nombrePostor} donde ofrecio $${monto} fue rechazada, la oferta actual es $${this.mayorMonto}`, COLORS.orange);
            return;
        }
        this.mayorMonto = monto;
        this.mayorPostor = nombrePostor;
        console.log(`%cLa oferta de ${nombrePostor} donde ofrecio $${monto} fue aceptada`, COLORS.green);
        for (const observador of this.observadores) {
            observador.actualizar(this.item, this.mayorMonto, this.mayorPostor);
        }
        console.log(`%cSe ha notificado a todos los observadores de la nueva oferta`, COLORS.blue);
    }
}

class Postor implements Observer {
    private nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    actualizar(item: string, monto: number, nombrePostor: string) {
        if (nombrePostor === this.nombre) {
            return;
        }
        console.log(`%c${this.nombre} es notificado: ${nombrePostor} lidera "${item}" con $${monto}`, COLORS.yellow);
    }
}

function main() {
    const subasta = new Subasta('Cuadro de Van Gogh', 100);

    const Sebastian = new Postor('Sebastian');
    const Kevin = new Postor('Kevin');
    const Daniela = new Postor('Daniela');

    subasta.suscribirse(Kevin);
    subasta.suscribirse(Daniela);

    subasta.realizarPuja('Daniela', 150);

    subasta.suscribirse(Sebastian);

    subasta.realizarPuja('Sebastian', 200);

    subasta.desuscribirse(Kevin);

    subasta.realizarPuja('Daniela', 250);
}

main();