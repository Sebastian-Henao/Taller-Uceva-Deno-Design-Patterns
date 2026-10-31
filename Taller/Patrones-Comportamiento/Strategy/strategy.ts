import { COLORS } from "../../../helpers/colors.ts";

/**
 * Patron de diseño: Strategy
 * Tema para el taller: calculo de rutas en un GPS
 *
 * ¿Que hace el patron?
 * Define varias formas de realizar una tarea y permite intercambiarlas
 * sin cambiar el objeto que las utiliza.
 *
 * ¿Que problema se resuelve?
 * El GPS necesita calcular rutas con distintos medios de transporte,
 * cada uno con una velocidad y una descripcion diferentes.
 *
 * ¿Por que el patron Strategy es adecuado para este problema?
 * Porque cada medio de transporte implementa la misma interfaz de estrategia.
 * El GPS puede cambiar de estrategia y calcular la ruta sin conocer los
 * detalles de cada medio.
 */

/** Resultado que una estrategia de ruta entrega al GPS. */
interface Ruta {
    minutos: number;
    descripcion: string;
}

/** Interfaz comun para las distintas formas de calcular una ruta. */
interface EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta;
}

/** Estrategia concreta que calcula una ruta a pie. 
 * Se divide entre 5 ya que se asume una velocidad de 
 * 5 km/h
*/
class Caminar implements EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta {
        return {
            minutos: Math.round((distanciaKM / 5) * 60),
            descripcion: 'Ruta peatonal',
        };
    }
}

/** Estrategia concreta que calcula una ruta en carro. 
 *  Se divide entre 40 ya que se asume una velocidad de 
 *  40 km/h
*/
class Carro implements EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta {
        return {
            minutos: Math.round((distanciaKM / 40) * 60),
            descripcion: 'Ruta por avenidas principales',
        };
    }
}

/** Estrategia concreta que calcula una ruta en bicicleta. 
 *  Se divide entre 15 ya que se asume una velocidad de 
 *  15 km/h
*/
class Bicicleta implements EstrategiaRuta {
    construirRuta(distanciaKM: number): Ruta {
        return {
            minutos: Math.round((distanciaKM / 15) * 60),
            descripcion: 'Ruta por ciclorutas',
        };
    }
}

/** Contexto que utiliza una estrategia y permite reemplazarla cuando se requiera. */
class GPS {
   constructor (private estrategia: EstrategiaRuta) {}

   /** Cambia el algoritmo de calculo de ruta utilizado por el GPS. */
   cambiarEstrategia(estrategia: EstrategiaRuta) {
    this.estrategia = estrategia;
   }

   /** Calcula la ruta con la estrategia actual y muestra sus datos. */
   irHacia(destino: string, distanciaKM: number) {
    const ruta = this.estrategia.construirRuta(distanciaKM);
    console.log(`%c El destino es ${destino} y esta a ${distanciaKM} km`, COLORS.yellow);
    console.log(`%c Usaras ${ruta.descripcion}`, COLORS.red);
    console.log(`%cTiempo estimado para llegar: ${ruta.minutos} minutos`, COLORS.green);
   }
}

/** Demuestra como cambiar el medio de transporte sin modificar el GPS. */
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