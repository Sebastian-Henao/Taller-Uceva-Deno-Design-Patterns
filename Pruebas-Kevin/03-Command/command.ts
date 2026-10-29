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

import { COLORS } from '../../helpers/colors.ts';

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

// Código provisional para probar los comandos sin invocador.
// Se reemplaza por el código cliente con History en el siguiente paso.
function main() {
  const playlist = new Playlist();

  const addCommand = new AddSongCommand(playlist, 'Bohemian Rhapsody');
  const removeCommand = new RemoveSongCommand(playlist, 'Bohemian Rhapsody');

  addCommand.execute();
  console.log(playlist.getSongs());

  removeCommand.execute();
  console.log(playlist.getSongs());

  // Cada comando sabe revertirse por sí mismo
  removeCommand.undo();
  console.log(playlist.getSongs());
}

main();
