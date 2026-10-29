/**
 * ! Factory Method: Enemigos por Zona de un Videojuego
 *
 * ! 1. QUÉ HACE EL PATRÓN
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 * Una clase base define el flujo general y deja un "método fábrica"
 * abstracto que cada subclase implementa para decidir qué objeto crear.
 *
 * ! 2. PROBLEMA QUE RESUELVE
 * En un videojuego cada zona (bosque, cueva, castillo) tiene sus propios
 * enemigos, pero el flujo de combate es el mismo en todas.
 * Si el combate se escribe con if/else preguntando la zona para saber
 * qué enemigo crear, cada zona nueva obliga a modificar ese código.
 *
 * ! 3. POR QUÉ ES ADECUADO
 * El flujo de combate se escribe una sola vez en la clase base Zone.
 * Cada zona concreta solo sobrescribe createEnemy() para decir
 * qué enemigo aparece. El combate nunca sabe con qué clase concreta trabaja.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

import { COLORS } from '../../helpers/colors.ts';

// 1. Interfaz Enemy
// [ROL: Producto]
// Define lo que todo enemigo debe saber hacer, sin importar la zona.
// El flujo de combate solo conoce esta interfaz, nunca las clases concretas.
interface Enemy {
  getName(): string;
  getHealth(): number;
  attack(): number; // Devuelve el daño que el enemigo causa al héroe
  receiveDamage(damage: number): void;
  isDefeated(): boolean;
}

// 2. Clases concretas de Enemigos
// [ROL: Producto Concreto]
// Cada clase representa al enemigo típico de una zona.
// Todas cumplen la interfaz Enemy, por eso son intercambiables en el combate.

// Enemigo del Bosque: poca vida, ataque rápido
class Wolf implements Enemy {
  private health: number = 40;

  getName(): string {
    return 'Lobo Salvaje';
  }

  getHealth(): number {
    return this.health;
  }

  attack(): number {
    console.log('%cEl lobo muerde al héroe', COLORS.green);
    return 8;
  }

  receiveDamage(damage: number): void {
    // Math.max evita que la vida quede en números negativos
    this.health = Math.max(this.health - damage, 0);
  }

  isDefeated(): boolean {
    return this.health === 0;
  }
}

// Enemigo de la Cueva: vida media, ataque fuerte
class Troll implements Enemy {
  private health: number = 70;

  getName(): string {
    return 'Troll de las Cavernas';
  }

  getHealth(): number {
    return this.health;
  }

  attack(): number {
    console.log('%cEl troll golpea con su garrote', COLORS.brown);
    return 15;
  }

  receiveDamage(damage: number): void {
    this.health = Math.max(this.health - damage, 0);
  }

  isDefeated(): boolean {
    return this.health === 0;
  }
}

// Enemigo del Castillo: mucha vida, ataque moderado
class DarkKnight implements Enemy {
  private health: number = 100;

  getName(): string {
    return 'Caballero Oscuro';
  }

  getHealth(): number {
    return this.health;
  }

  attack(): number {
    console.log('%cEl caballero oscuro lanza un espadazo', COLORS.purple);
    return 12;
  }

  receiveDamage(damage: number): void {
    this.health = Math.max(this.health - damage, 0);
  }

  isDefeated(): boolean {
    return this.health === 0;
  }
}

// 3. Clase Base Zone con el Método Factory
// [ROL: Creador]
// Contiene el flujo de combate común a todas las zonas (startCombat).
// No sabe qué enemigo va a aparecer: se lo pide al método fábrica createEnemy(),
// que cada subclase implementa a su manera.
// deno-lint-ignore no-unused-vars -- Las zonas concretas que la usan se agregan en el siguiente paso
abstract class Zone {
  // [ROL: Método Fábrica]
  // Es abstracto: obliga a cada zona concreta a decidir qué enemigo crea.
  protected abstract createEnemy(): Enemy;

  // Nombre de la zona, también lo define cada subclase
  protected abstract getZoneName(): string;

  // Flujo de combate común. Se escribe UNA sola vez y sirve para todas las zonas.
  startCombat(heroName: string, heroDamage: number): void {
    // El enemigo se obtiene a través del método fábrica, no con "new" directo
    const enemy = this.createEnemy();

    console.log(`\n%c=== Zona: ${this.getZoneName()} ===`, COLORS.yellow);
    console.log(
      `¡Un %c${enemy.getName()}%c aparece con ${enemy.getHealth()} de vida!`,
      COLORS.red,
      COLORS.white,
    );

    let heroHealth = 100;
    let round = 1;

    // Se repiten rondas hasta que el enemigo sea derrotado
    while (!enemy.isDefeated()) {
      console.log(`%cRonda ${round}`, COLORS.cyan);

      // El héroe ataca primero
      enemy.receiveDamage(heroDamage);
      console.log(
        `${heroName} ataca y causa ${heroDamage} de daño. Vida del enemigo: ${enemy.getHealth()}`,
      );

      // Si el enemigo sigue en pie, responde al ataque
      if (!enemy.isDefeated()) {
        heroHealth -= enemy.attack();
        console.log(`Vida de ${heroName}: ${heroHealth}`);
      }

      round++;
    }

    console.log(
      `%c¡${heroName} derrotó al ${enemy.getName()} en ${round - 1} rondas!`,
      COLORS.green,
    );
  }
}

// Código provisional para probar los productos concretos.
// Se reemplaza por el código cliente definitivo en el siguiente paso.
function main() {
  const enemies: Enemy[] = [new Wolf(), new Troll(), new DarkKnight()];

  enemies.forEach((enemy) => {
    console.log(`${enemy.getName()} - Vida: ${enemy.getHealth()}`);
    enemy.attack();
  });
}

main();
