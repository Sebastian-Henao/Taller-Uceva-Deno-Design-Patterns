# Taller  Patrones de Diseño

**Asignatura:** Arquitectura de Software

**Docente:** Jesús David Mejía Vergara

## Integrantes

- Daniela Gutierrez Gallego - 230231001
- Sebastian Henao Gamboa - 230231021
- Kevin Andres Montes camelo - 230231025

## Patrones utilizados

| # | Patrón | Tipo | Ruta al Archivo |
|---|--------|------|---------|
| 1 | Adapter | Estructural (obligatorio) | `Taller/Patrones-Estructurales/Adapter/adapter.ts` |
| 2 | Observer | Comportamiento (obligatorio) | `Taller/Patrones-Comportamiento/Observer/observer.ts` |
| 3 | Singleton | Creacional | `Taller/Patrones-Creacionales/Singleton/singleton.ts` |
| 4 | Strategy | Comportamiento | `Taller/Patrones-Comportamiento/Strategy/strategy.ts` |

## Descripción de cada ejercicio

### Adapter — Almacenamiento en la nube
Google Drive, DropBox y OneDrive ofrecen operaciones distintas para guardar un archivo. Cada adaptador traduce la operación común `subir` al método y los parámetros que necesita su servicio, de modo que el cliente usa los tres de la misma forma.

### Observer — Subasta
La subasta mantiene una lista de postores suscritos. Cuando se acepta una nueva puja, todos los postores (excepto quien la hizo) reciben automáticamente el aviso de la oferta líder, y pueden retirarse en cualquier momento.

### Singleton — Turnos en una EPS
Varios dispensadores entregan turnos a los pacientes. Al compartir una única instancia con un solo contador, nunca se entrega el mismo turno dos veces.

### Strategy — Navegación GPS
El cálculo de la ruta cambia según el medio de transporte (caminando, bicicleta o carro). Cada forma de calcularla vive en su propia clase y el GPS puede cambiar de estrategia en tiempo de ejecución sin modificar su código.

## Cómo ejecutar

Entramos a la carpeta del taller

```bash
cd Taller
```

Entramos a la carpeta segun el tipo de patron que queramos, por ejemplo:

```bash
cd Patrones-Comportamiento
```

Entramos a la carpeta del patron en especifico, por ejemplo:

```bash
cd Observer
```

Ejecutamos el patron, por ejemplo

```bash
deno observer.ts
```