# Command - Lista de Reproducción con Deshacer/Rehacer

## ¿Qué es el patrón?

Command es un patrón de **comportamiento** que encapsula una solicitud como un objeto.
Esto permite guardar las acciones, encolarlas, registrarlas y deshacerlas, y además
desacopla al que invoca la acción del que sabe realizarla.

## Problema que resuelve el ejercicio

Una app de música permite agregar y quitar canciones de una lista de reproducción, y el
usuario debe poder **deshacer** y **rehacer**. Si los botones llaman directo a los métodos
de la lista, no queda registro de lo que se hizo. Con Command cada acción es un objeto
que sabe ejecutarse y revertirse, y `History` los guarda en pilas.

> **Diferencia con Strategy:** Command encapsula una *acción* para guardarla y revertirla;
> Strategy encapsula un *algoritmo* para intercambiarlo por otro.

## Clases y rol de cada una

| Clase | Rol en el patrón | Descripción |
| --- | --- | --- |
| `Command` | Comando | Interfaz con `execute()` y `undo()`. |
| `Playlist` | Receptor | Guarda las canciones y sabe agregarlas, insertarlas y quitarlas. |
| `AddSongCommand` | Comando Concreto | Agrega una canción y guarda su posición para poder quitarla al deshacer. |
| `RemoveSongCommand` | Comando Concreto | Quita una canción y guarda su posición para devolverla a su lugar al deshacer. |
| `History` | Invocador | Pilas `done` y `undone`, con los métodos `run()`, `undo()` y `redo()`. |

## Ejecución

```
cd Pruebas-Kevin/03-Command
```
```
deno command.ts
```

El programa pide dos canciones (por defecto `Bohemian Rhapsody` e `Imagine`), luego
agrega ambas, quita la primera, deshace dos veces y rehace una, mostrando la lista en
cada paso.
