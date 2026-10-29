/**
 * ! Patrón Flyweight: Bosque de Árboles
 *
 * ! 1. QUÉ HACE EL PATRÓN
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 * Separa los datos de un objeto en dos partes:
 *  - Estado intrínseco: datos que se repiten y se pueden COMPARTIR
 *    (en este ejercicio: nombre, color y textura del árbol).
 *  - Estado extrínseco: datos PROPIOS de cada objeto que cambian de uno a otro
 *    (en este ejercicio: la posición x, y de cada árbol).
 *
 * ! 2. PROBLEMA QUE RESUELVE
 * Queremos dibujar un bosque con 10.000 árboles. Si cada árbol guarda su propio
 * nombre, color y textura, esos mismos datos se repiten miles de veces
 * aunque solo existan 3 especies distintas, desperdiciando memoria.
 *
 * ! 3. POR QUÉ ES ADECUADO
 * Solo existen 3 combinaciones de nombre/color/textura. Con Flyweight se crean
 * 3 objetos TreeType compartidos y cada uno de los 10.000 árboles guarda
 * únicamente su posición y una referencia a su tipo.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from '../../helpers/colors.ts';

// 1. Clase que representa el tipo de árbol - TreeType
// [ROL: Flyweight]
// Guarda SOLO el estado intrínseco (compartido): nombre, color y textura.
// Un mismo TreeType es usado por miles de árboles, por eso nunca guarda la posición.
class TreeType {
  private name: string;
  private color: string;
  private texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  // El estado extrínseco (x, y) llega como parámetro, no se guarda en el flyweight.
  draw(x: number, y: number): void {
    console.log(
      `Dibujando %c${this.name}%c (color ${this.color}, textura ${this.texture}) en (${x}, ${y})`,
      COLORS.green,
      COLORS.white,
    );
  }
}

// 2. Fábrica de Flyweights - TreeTypeFactory
// [ROL: Fábrica Flyweight]
// Mantiene una cache (Map) con los tipos ya creados.
// Si el tipo pedido ya existe lo devuelve; si no, lo crea, lo guarda y lo devuelve.
// Así se garantiza que nunca haya dos TreeType con los mismos datos.
class TreeTypeFactory {
  private treeTypes: Map<string, TreeType> = new Map();

  getTreeType(name: string, color: string, texture: string): TreeType {
    // La llave identifica de forma única cada combinación de estado intrínseco
    const key = `${name}-${color}-${texture}`;

    if (!this.treeTypes.has(key)) {
      console.log(`%cCreando una instancia del TreeType ${key}`, COLORS.red);
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }

    // El "!" indica a TypeScript que en este punto la llave siempre existe
    return this.treeTypes.get(key)!;
  }

  // Cuántos TreeType se crearon realmente
  getTotalTypes(): number {
    return this.treeTypes.size;
  }
}

// Código provisional para probar la cache de la fábrica.
// Se reemplaza por el código cliente definitivo en el siguiente paso.
function main() {
  const factory = new TreeTypeFactory();

  const oak1 = factory.getTreeType('Roble', 'Verde oscuro', 'Rugosa');
  const oak2 = factory.getTreeType('Roble', 'Verde oscuro', 'Rugosa');
  const pine = factory.getTreeType('Pino', 'Verde', 'Agujas');

  oak1.draw(10, 20);
  oak2.draw(30, 40);
  pine.draw(50, 60);

  // oak1 y oak2 son el MISMO objeto: la fábrica no creó uno nuevo
  console.log(`¿oak1 y oak2 son el mismo objeto? %c${oak1 === oak2}`, COLORS.yellow);
  console.log(`TreeType creados: %c${factory.getTotalTypes()}`, COLORS.yellow);
}

main();
