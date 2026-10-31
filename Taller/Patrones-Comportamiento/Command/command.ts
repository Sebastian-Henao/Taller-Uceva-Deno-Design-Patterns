/**
 * ! Patrón Command: Lista de Reproducción con Deshacer/Rehacer
 *
 * ! 1. QUÉ HACE EL PATRÓN
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * ! 2. PROBLEMA QUE RESUELVE
 * Una app de música permite agregar y quitar canciones de una lista de reproducción,
 * y el usuario debe poder deshacer y rehacer esas acciones.
 * Si los botones llaman directo a los métodos de la lista (addSong, removeSong...)
 * no queda registro de lo que se hizo, así que no hay forma de revertirlo.
 *
 * ! 3. POR QUÉ ES ADECUADO
 * Cada acción se convierte en un objeto (comando) que sabe ejecutarse (execute)
 * y revertirse (undo), guardando los datos necesarios para hacerlo.
 * Un invocador (History) guarda esos objetos en pilas y así puede
 * deshacer y rehacer sin conocer los detalles de cada acción.
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 * https://refactoring.guru/es/design-patterns/command
 */

import { COLORS } from '../../../helpers/colors.ts';

// 1. Interfaz Command
// [ROL: Comando]
// Todo comando sabe ejecutarse y revertirse.
// Quien lo invoque solo conoce estos dos métodos.
interface Command {
  execute(): void;
  undo(): void;
}

// 2. Clase Receptor - Playlist
// [ROL: Receptor]
// Contiene la lógica real: guarda las canciones y sabe agregarlas o quitarlas.
// No sabe nada de comandos ni de historial.
class Playlist {
  private songs: string[] = [];

  // Agrega una canción al final y devuelve la posición donde quedó
  addSong(title: string): number {
    this.songs.push(title);
    return this.songs.length - 1;
  }

  // Inserta una canción en una posición específica
  insertSongAt(index: number, title: string): void {
    this.songs.splice(index, 0, title);
  }

  // Quita la canción de una posición específica
  removeSongAt(index: number): void {
    this.songs.splice(index, 1);
  }

  // Devuelve la posición de una canción o -1 si no existe
  indexOf(title: string): number {
    return this.songs.indexOf(title);
  }

  getSongs(): string[] {
    return this.songs;
  }
}

// 3. Clases de Comandos Concretos
// [ROL: Comando Concreto]
// Cada comando recibe el receptor (Playlist) en el constructor
// y guarda lo necesario para poder revertirse.

class AddSongCommand implements Command {
  private playlist: Playlist;
  private title: string;
  // Posición donde se agregó la canción: se necesita para deshacer
  private addedIndex: number = -1;

  constructor(playlist: Playlist, title: string) {
    this.playlist = playlist;
    this.title = title;
  }

  execute(): void {
    this.addedIndex = this.playlist.addSong(this.title);
    console.log(`%cAgregada: "${this.title}"`, COLORS.green);
  }

  undo(): void {
    // Revertir = quitar la canción de la posición donde se agregó
    this.playlist.removeSongAt(this.addedIndex);
    console.log(`%cSe deshizo agregar: "${this.title}"`, COLORS.orange);
  }
}

class RemoveSongCommand implements Command {
  private playlist: Playlist;
  private title: string;
  // Posición de la que se quitó la canción: se necesita para devolverla a su lugar
  private removedIndex: number = -1;

  constructor(playlist: Playlist, title: string) {
    this.playlist = playlist;
    this.title = title;
  }

  execute(): void {
    this.removedIndex = this.playlist.indexOf(this.title);

    if (this.removedIndex === -1) {
      console.log(`%cLa canción "${this.title}" no está en la lista`, COLORS.red);
      return;
    }

    this.playlist.removeSongAt(this.removedIndex);
    console.log(`%cQuitada: "${this.title}"`, COLORS.red);
  }

  undo(): void {
    // Si la canción no existía al ejecutar, no hay nada que revertir
    if (this.removedIndex === -1) return;

    // Revertir = volver a insertar la canción en la misma posición
    this.playlist.insertSongAt(this.removedIndex, this.title);
    console.log(`%cSe deshizo quitar: "${this.title}"`, COLORS.orange);
  }
}

// 4. Clase Invocador - History
// [ROL: Invocador]
// Ejecuta los comandos y los guarda en dos pilas:
//  - done: comandos ejecutados (se pueden deshacer).
//  - undone: comandos deshechos (se pueden rehacer).
// No sabe si el comando agrega o quita canciones: solo llama execute() y undo().
class History {
  private done: Command[] = [];
  private undone: Command[] = [];

  // Ejecuta un comando nuevo y lo registra
  run(command: Command): void {
    command.execute();
    this.done.push(command);
    // Una acción nueva invalida lo que se había deshecho: ya no se puede rehacer
    this.undone = [];
  }

  // Deshace el último comando ejecutado
  undo(): void {
    const command = this.done.pop();

    if (!command) {
      console.log('%cNo hay nada para deshacer', COLORS.gray);
      return;
    }

    command.undo();
    this.undone.push(command);
  }

  // Vuelve a ejecutar el último comando deshecho
  redo(): void {
    const command = this.undone.pop();

    if (!command) {
      console.log('%cNo hay nada para rehacer', COLORS.gray);
      return;
    }

    command.execute();
    this.done.push(command);
  }
}

// * Diferencia con Strategy:
// * - Command encapsula una ACCIÓN (con sus datos) como objeto para poder
// *   guardarla, encolarla y revertirla (undo/redo).
// * - Strategy encapsula un ALGORITMO para intercambiarlo por otro que
// *   resuelve lo mismo de otra forma; no guarda historial ni se revierte.

// Muestra el estado actual de la lista de reproducción
function showPlaylist(playlist: Playlist): void {
  const songs = playlist.getSongs();
  const text = songs.length > 0 ? songs.join(' | ') : '(vacía)';
  console.log(`Lista: %c[ ${text} ]\n`, COLORS.cyan);
}

// 5. Código Cliente para probar el patrón Command
function main() {
  // Paso 1: Crear el receptor (Playlist) y el invocador (History).
  const playlist = new Playlist();
  const history = new History();

  // Paso 2: Pedir las dos canciones (si no se escribe nada se usan valores por defecto).
  const firstSong = prompt('Primera canción:') || 'Bohemian Rhapsody';
  const secondSong = prompt('Segunda canción:') || 'Imagine';

  // Paso 3: Agregar la primera canción.
  console.log('\n%cPaso 3: Agregar primera canción', COLORS.yellow);
  history.run(new AddSongCommand(playlist, firstSong));
  showPlaylist(playlist);

  // Paso 4: Agregar la segunda canción.
  console.log('%cPaso 4: Agregar segunda canción', COLORS.yellow);
  history.run(new AddSongCommand(playlist, secondSong));
  showPlaylist(playlist);

  // Paso 5: Quitar la primera canción.
  console.log('%cPaso 5: Quitar primera canción', COLORS.yellow);
  history.run(new RemoveSongCommand(playlist, firstSong));
  showPlaylist(playlist);

  // Paso 6: Deshacer (vuelve la canción quitada a su posición original).
  console.log('%cPaso 6: Deshacer', COLORS.yellow);
  history.undo();
  showPlaylist(playlist);

  // Paso 7: Deshacer otra vez (quita la segunda canción agregada).
  console.log('%cPaso 7: Deshacer', COLORS.yellow);
  history.undo();
  showPlaylist(playlist);

  // Paso 8: Rehacer (vuelve a agregar la segunda canción).
  console.log('%cPaso 8: Rehacer', COLORS.yellow);
  history.redo();
  showPlaylist(playlist);
}

main();
