import { COLORS } from "../../../helpers/colors.ts";

interface Ruta {
    minutos: number;
    descripcion: string;
}

interface EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta;
}

class Caminar implements EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta {
        return {
            minutos: Math.round((distanciaKM / 5) * 60),
            descripcion: 'Ruta peatonal',
        };
    }
}

class Carro implements EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta {
        return {
            minutos: Math.round((distanciaKM / 40) * 60),
            descripcion: 'Ruta por avenidas principales',
        };
    }
}

class Bicicleta implements EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta {
        return {
            minutos: Math.round((distanciaKM / 15) * 60),
            descripcion: 'Ruta por ciclorutas',
        };
    }
}

class GPS {
   constructor (private estrategia: EstrategiaRuta) {}

   cambiarEstrategia(estrategia: EstrategiaRuta) {
    this.estrategia = estrategia;
   }

   irHacia(destino: string, distanciaKM: number) {
    const ruta = this.estrategia.construirRuta(distanciaKM);
    console.log(`%c El destino es ${destino} y esta a ${distanciaKM} km`, COLORS.yellow);
    console.log(`%c Usaras ${ruta.descripcion}`, COLORS.red);
    console.log(`%cTiempo estimado para llegar: ${ruta.minutos} minutos`, COLORS.green);
   }
}

function main() {
    const navegador = new GPS(new Caminar());
    console.log("%cDecides salir, piensas ir caminando", COLORS.cyan);
    navegador.irHacia('Centro comercial', 10);

    console.log("%cMejor quieres ir en bicicleta", COLORS.cyan);
    navegador.cambiarEstrategia(new Bicicleta());
    navegador.irHacia('Centro comercial', 10);

    console.log("%cte decides ir finalmente en carro", COLORS.cyan);
    navegador.cambiarEstrategia(new Carro());
    navegador.irHacia('Centro comercial', 10);
}

main();