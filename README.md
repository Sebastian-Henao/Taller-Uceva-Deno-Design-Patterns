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
| 5 | Factory Method | Creacional | `Taller/Patrones-Creacionales/Factory-Method/factory-method.ts` |
| 6 | Flyweight | Estructural | `Taller/Patrones-Estructurales/Flyweight/flyweight.ts` |
| 7 | Command | Comportamiento | `Taller/Patrones-Comportamiento/Command/command.ts` |
| 8 | Builder | Creacional (obligatorio) | `Taller/Patrones-Creacionales/Builder/builder.ts` |
| 9 | Facade | Estructural | `Taller/Patrones-Estructurales/Facade/facade.ts` |
| 10 | Template Method | Comportamiento | `Taller/Patrones-Comportamiento/Template-Method/template-method.ts` |

## Descripción de cada ejercicio

### Adapter — Almacenamiento en la nube
Google Drive, DropBox y OneDrive ofrecen operaciones distintas para guardar un archivo. Cada adaptador traduce la operación común `subir` al método y los parámetros que necesita su servicio, de modo que el cliente usa los tres de la misma forma.

### Observer — Subasta
La subasta mantiene una lista de postores suscritos. Cuando se acepta una nueva puja, todos los postores (excepto quien la hizo) reciben automáticamente el aviso de la oferta líder, y pueden retirarse en cualquier momento.

### Singleton — Turnos en una EPS
Varios dispensadores entregan turnos a los pacientes. Al compartir una única instancia con un solo contador, nunca se entrega el mismo turno dos veces.

### Strategy — Navegación GPS
El cálculo de la ruta cambia según el medio de transporte (caminando, bicicleta o carro). Cada forma de calcularla vive en su propia clase y el GPS puede cambiar de estrategia en tiempo de ejecución sin modificar su código.

### Factory Method — Enemigos por zona en un videojuego
Cada zona (bosque, cueva y castillo) tiene su propio enemigo, pero el flujo de combate es el mismo. La clase abstracta `Zone` define el combate una sola vez y cada zona concreta sobrescribe el método fábrica `createEnemy()` para crear su enemigo, de modo que agregar una zona nueva no obliga a modificar el combate. El programa pide el nombre del héroe y la zona (por defecto `Zar` y todas las zonas).

### Flyweight — Bosque de árboles
Se plantan 10.000 árboles de solo 3 especies. El nombre, color y textura (estado intrínseco) se guardan en objetos `TreeType` compartidos que entrega una fábrica con caché, y cada árbol guarda únicamente su posición (estado extrínseco), así que solo se crean 3 `TreeType` en lugar de repetir esos datos 10.000 veces.

### Command — Lista de reproducción con deshacer/rehacer
Agregar y quitar canciones son comandos que saben ejecutarse y revertirse guardando la posición de la canción. El historial (`History`) los guarda en dos pilas para poder deshacer y rehacer sin conocer los detalles de cada acción. El programa pide dos canciones (por defecto `Bohemian Rhapsody` e `Imagine`).

### Builder — Itinerarios de viaje
Un viaje combina destino, duración, transporte, alojamiento y actividades. `ItinerarioBuilder` permite configurar cada parte paso a paso y construir itinerarios distintos sin un constructor con muchos parámetros.

### Facade — Compra en línea
Procesar una compra requiere coordinar inventario, pago y confirmación por correo. `CompraFacade` presenta una operación sencilla al cliente, valida los datos y coordina esos servicios; el ejemplo muestra una compra exitosa y otra sin existencias suficientes.

### Template Method — Exportación de reportes de ventas
Los reportes deben seguir el mismo flujo de validación, formateo y entrega, aunque se exporten en formatos distintos. `ExportadorDeVentas` define ese flujo y `ExportadorCSV` y `ExportadorJSON` implementan el formato de salida.

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