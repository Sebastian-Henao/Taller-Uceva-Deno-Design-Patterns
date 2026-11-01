import { COLORS } from '../../../helpers/colors.ts';

/**
 * Patrón de diseño: Template Method
 * Tema para el taller: exportación de reportes de ventas
 *
 * ¿Qué hace el patrón?
 * Define la estructura de un algoritmo y permite que las subclases
 * implementen algunos de sus pasos.
 *
 * ¿Qué problema se resuelve?
 * Los reportes de ventas deben validar los mismos datos, generar su contenido
 * y entregarlo, pero cada formato representa la informacion de manera distinta.
 * Duplicar el flujo en cada exportador puede producir pasos inconsistentes.
 *
 * ¿Por qué Template Method es adecuado para este problema?
 * La clase base conserva el flujo comun de exportacion, mientras que los
 * exportadores concretos solo definen como formatear el reporte. Asi se
 * reutiliza el proceso sin limitar los formatos disponibles.
 */

interface Venta {
  fecha: string;
  producto: string;
  total: number;
}

/** Define el flujo comun para validar, formatear y entregar un reporte. */
abstract class ExportadorDeVentas {
  exportar(ventas: readonly Venta[]): string {
    this.validar(ventas);
    const contenido = this.formatear(ventas);
    this.entregar(contenido);
    return contenido;
  }

  private validar(ventas: readonly Venta[]): void {
    if (ventas.length === 0) {
      throw new Error('No hay ventas para exportar.');
    }

    for (const venta of ventas) {
      if (
        !venta.fecha.trim() ||
        !venta.producto.trim() ||
        !Number.isFinite(venta.total) ||
        venta.total < 0
      ) {
        throw new Error('El reporte contiene una venta con datos inválidos.');
      }
    }
  }

  protected abstract formatear(ventas: readonly Venta[]): string;

  private entregar(contenido: string): void {
    console.log('Reporte generado:');
    console.log(contenido);
  }
}

/** Exporta los datos de ventas como filas separadas por comas. */
class ExportadorCSV extends ExportadorDeVentas {
  protected formatear(ventas: readonly Venta[]): string {
    const encabezado = 'fecha,producto,total';
    const filas = ventas.map((venta) =>
      [
        venta.fecha,
        venta.producto,
        venta.total.toFixed(2),
      ]
        .map((valor) => `"${valor.replaceAll('"', '""')}"`)
        .join(',')
    );

    return [encabezado, ...filas].join('\n');
  }
}

/** Exporta los datos de ventas como un documento JSON. */
class ExportadorJSON extends ExportadorDeVentas {
  protected formatear(ventas: readonly Venta[]): string {
    return JSON.stringify(ventas, null, 2);
  }
}

function main(): void {
  const ventas: Venta[] = [
    { fecha: '2026-10-30', producto: 'Cuaderno', total: 24000 },
    { fecha: '2026-10-31', producto: 'Lapiz', total: 5000 },
  ];

  console.log('%cExportacion CSV', COLORS.blue);
  new ExportadorCSV().exportar(ventas);

  console.log('\n%cExportacion JSON', COLORS.green);
  new ExportadorJSON().exportar(ventas);
}

main();
