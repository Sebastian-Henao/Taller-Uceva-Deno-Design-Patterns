# Factory Method - Enemigos por Zona

## ¿Qué es el patrón?

Factory Method es un patrón **creacional** que permite crear objetos sin especificar
la clase exacta del objeto que se creará. Una clase base define el flujo general y
delega la creación del objeto a un método abstracto (el *método fábrica*) que cada
subclase implementa.

## Problema que resuelve el ejercicio

En un videojuego hay varias zonas (bosque, cueva, castillo) y cada una tiene sus
propios enemigos, pero el **flujo de combate es el mismo** en todas.

Si el combate se escribe con `if/else` preguntando la zona para saber qué enemigo
crear, cada zona nueva obliga a modificar ese código. Con Factory Method el combate
se escribe una sola vez en `Zone` y cada zona solo decide qué enemigo crea.

## Clases y rol de cada una

| Clase | Rol en el patrón | Descripción |
| --- | --- | --- |
| `Enemy` | Producto | Interfaz común de los enemigos: `getName()`, `getHealth()`, `attack()`, `receiveDamage()`, `isDefeated()`. |
| `Wolf`, `Troll`, `DarkKnight` | Producto Concreto | Enemigos del bosque, la cueva y el castillo. |
| `Zone` | Creador | Clase abstracta con el método fábrica `createEnemy()` y el flujo de combate común `startCombat()`. |
| `ForestZone`, `CaveZone`, `CastleZone` | Creador Concreto | Sobrescriben `createEnemy()` para devolver su enemigo. |

Agregar una zona nueva (por ejemplo `VolcanoZone` con un `Dragon`) no requiere
modificar `Zone` ni las otras zonas.

## Ejecución

```
cd Pruebas-Kevin/01-Factory-Method
```
```
deno factory-method.ts
```

El programa pide el nombre del héroe y la zona (`bosque`, `cueva`, `castillo` o
`todas`). Si se presiona Enter sin escribir nada, usa `Zar` y recorre todas las zonas.
