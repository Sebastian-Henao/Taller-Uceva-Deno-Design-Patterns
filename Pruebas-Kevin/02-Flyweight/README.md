# Flyweight - Bosque de Árboles

## ¿Qué es el patrón?

Flyweight es un patrón **estructural** que permite usar objetos compartidos para
soportar eficientemente grandes cantidades de objetos. Divide los datos en:

- **Estado intrínseco**: datos repetidos que se **comparten** (nombre, color y textura del árbol).
- **Estado extrínseco**: datos **propios** de cada objeto (la posición `x`, `y` del árbol).

## Problema que resuelve el ejercicio

Se quiere dibujar un bosque de 10.000 árboles. Si cada árbol guarda su propio nombre,
color y textura, esos datos se repiten miles de veces aunque solo existan 3 especies,
desperdiciando memoria. Con Flyweight solo se crean 3 objetos `TreeType` y cada árbol
guarda su posición y una referencia a su tipo.

## Clases y rol de cada una

| Clase | Rol en el patrón | Descripción |
| --- | --- | --- |
| `TreeType` | Flyweight | Guarda el estado intrínseco (nombre, color, textura) y lo dibuja con `draw(x, y)`. |
| `TreeTypeFactory` | Fábrica Flyweight | Cache con `Map`: devuelve el `TreeType` existente o crea uno nuevo. |
| `Tree` | Contexto | Guarda solo `x`, `y` y la referencia a su `TreeType`. |
| `Forest` | Cliente | Planta árboles usando la fábrica y los dibuja. |

## Ejecución

```
cd Pruebas-Kevin/02-Flyweight
```
```
deno flyweight.ts
```

El programa pregunta cuántos árboles plantar (por defecto `10000`). Dibuja solo una
muestra de 6 árboles y al final compara el total de árboles con los `TreeType`
creados realmente (3).
