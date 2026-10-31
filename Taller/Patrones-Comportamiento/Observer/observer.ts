import { COLORS } from "../../../helpers/colors.ts";

/**
 * Patron de diseño: Observer
 * Tema para el taller: subasta
 *
 * ¿Que hace el patron?
 * Permite que un objeto notifique automaticamente a varios observadores
 * cuando cambia su estado.
 *
 * ¿Que problema se resuelve?
 * Cuando se acepta una nueva puja, los postores suscritos deben conocer
 * la oferta lider sin que la subasta tenga que depender de cada postor concreto.
 *
 * ¿Por que el patron Observer es adecuado para este problema?
 * Porque Subasta mantiene la lista de observadores y les comunica cada nueva
 * oferta. Los postores reciben la notificacion implementando una interfaz comun.
 */

/** Define la operacion que cada observador debe implementar para recibir cambios. */
interface Observer {
    actualizar(item: string, monto: number, nombrePostor: string): void;
}

/** Sujeto observado: administra a los postores y publica las pujas aceptadas. */
class Subasta {
    private observadores: Observer[] = [];
    private mayorMonto: number;
    private mayorPostor: string = 'nadie';

    /** Guarda el articulo y establece el monto inicial de la subasta. */
    constructor(private item: string, montoInicial: number){
        this.mayorMonto = montoInicial;
        console.log(`%cSe ha iniciado una subasta por ${item} con un monto inicial de $${montoInicial}`, COLORS.green);
    }

    /** Agrega un observador para que reciba las siguientes ofertas aceptadas. */
    suscribirse(observador: Observer) {
        this.observadores.push(observador);
        console.log("%cSe ha unido un nuevo postor a la subasta", COLORS.blue);
    }

    /** Quita al observador de la lista de notificaciones. */
    desuscribirse(observador: Observer) {
        this.observadores = this.observadores.filter(obs => obs != observador);
        console.log("%cUn postor se ha retirado de la subasta", COLORS.red);
    }

    /** Rechaza ofertas que no superan la actual; si la supera, actualiza el estado y notifica. */
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

/** Observador concreto: representa a un postor suscrito a la subasta. */
class Postor implements Observer {
    private nombre: string;

    /** Guarda el nombre que se usara para identificar al postor. */
    constructor(nombre: string) {
        this.nombre = nombre;
    }

    /** Recibe la nueva oferta; el postor que la hizo no necesita notificarse a si mismo. */
    actualizar(item: string, monto: number, nombrePostor: string) {
        if (nombrePostor === this.nombre) {
            return;
        }
        console.log(`%c${this.nombre} es notificado: ${nombrePostor} lidera "${item}" con $${monto}`, COLORS.yellow);
    }
}

/** Demuestra como los postores se suscriben, reciben notificaciones y se retiran. */
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