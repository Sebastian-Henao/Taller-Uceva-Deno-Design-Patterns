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

import { COLORS } from '../../../helpers/colors.ts';

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

// 3. Clase que representa un Árbol - Tree
// [ROL: Contexto]
// Guarda SOLO el estado extrínseco (propio de cada árbol): su posición x, y.
// Los datos pesados y repetidos no se copian: se guarda una referencia al TreeType.
// Por eso crear 10.000 Tree es barato.
class Tree {
  private x: number;
  private y: number;
  private type: TreeType;

  constructor(x: number, y: number, type: TreeType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  // El árbol delega el dibujo a su flyweight, pasándole su estado extrínseco
  draw(): void {
    this.type.draw(this.x, this.y);
  }
}

// 4. Bosque - Forest
// [ROL: Cliente]
// Planta y dibuja los árboles. Pide los TreeType a la fábrica
// para no crear tipos repetidos.
class Forest {
  private trees: Tree[] = [];
  private factory: TreeTypeFactory;

  constructor(factory: TreeTypeFactory) {
    this.factory = factory;
  }

  plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string,
  ): void {
    // Estado intrínseco -> se obtiene compartido desde la fábrica
    const type = this.factory.getTreeType(name, color, texture);
    // Estado extrínseco -> se guarda en el propio árbol
    this.trees.push(new Tree(x, y, type));
  }

  // Dibuja solo los primeros "limit" árboles para no llenar la consola
  draw(limit: number): void {
    this.trees.slice(0, limit).forEach((tree) => tree.draw());
  }

  getTreeCount(): number {
    return this.trees.length;
  }
}

// 5. Código Cliente para probar el Flyweight
function main() {
  // Paso 1: Crear la fábrica de flyweights y el bosque que la usa.
  const factory = new TreeTypeFactory();
  const forest = new Forest(factory);

  // Paso 2: Definir las 3 especies disponibles (estado intrínseco).
  const species = [
    { name: 'Roble', color: 'Verde oscuro', texture: 'Rugosa' },
    { name: 'Pino', color: 'Verde', texture: 'Agujas' },
    { name: 'Cerezo', color: 'Rosado', texture: 'Lisa' },
  ];

  // Paso 3: Pedir cuántos árboles plantar (por defecto 10.000).
  const input = Number(prompt('¿Cuántos árboles quieres plantar?', '10000'));
  const totalTrees = Number.isInteger(input) && input > 0 ? input : 10000;

  // Paso 4: Plantar los árboles.
  // Cada árbol toma una especie de forma rotativa y una posición calculada,
  // así cada uno tiene coordenadas distintas (estado extrínseco).
  for (let i = 0; i < totalTrees; i++) {
    const { name, color, texture } = species[i % species.length];
    const x = (i * 7) % 500;
    const y = (i * 13) % 500;
    forest.plantTree(x, y, name, color, texture);
  }

  // Paso 5: Dibujar solo unos pocos árboles como muestra.
  console.log('\n%cMuestra de los primeros 6 árboles:', COLORS.cyan);
  forest.draw(6);

  // Paso 6: Comparar cuántos árboles hay frente a cuántos TreeType se crearon.
  console.log(
    `\nTotal de árboles plantados: %c${forest.getTreeCount()}`,
    COLORS.yellow,
  );
  console.log(
    `Total de TreeType creados realmente: %c${factory.getTotalTypes()}`,
    COLORS.yellow,
  );
  console.log(
    '%cSin Flyweight, nombre, color y textura se habrían copiado en cada árbol.',
    COLORS.gray,
  );
}

main();
