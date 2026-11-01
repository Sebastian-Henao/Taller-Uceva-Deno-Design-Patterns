import { COLORS } from '../../../helpers/colors.ts';

/**
 * Patrón de diseño: Facade
 * Tema para el taller: compra en una tienda en línea
 *
 * ¿Qué hace el patrón?
 * Proporciona una interfaz sencilla para coordinar varios componentes de
 * un subsistema.
 *
 * ¿Qué problema se resuelve?
 * Confirmar una compra requiere revisar y reservar inventario, cobrar el
 * pedido y enviar una confirmacion. El cliente no deberia coordinar esos
 * servicios ni conocer el orden de sus operaciones.
 *
 * ¿Por qué Facade es adecuado para este problema?
 * La fachada ofrece una sola operacion para procesar el pedido y coordina
 * los servicios internos en el orden necesario, manteniendo el codigo cliente
 * separado de los detalles de la compra.
 */

interface Pedido {
  producto: string;
  cantidad: number;
  precioUnitario: number;
  correo: string;
}

/** Subsistema que verifica y reserva las unidades disponibles. */
class Inventario {
  private existencias = new Map<string, number>([
    ['Cuaderno', 8],
    ['Lapiz', 3],
  ]);

  reservar(producto: string, cantidad: number): boolean {
    const disponibles = this.existencias.get(producto) ?? 0;
    if (disponibles < cantidad) {
      return false;
    }

    this.existencias.set(producto, disponibles - cantidad);
    console.log(`Inventario: reservadas ${cantidad} unidades de ${producto}.`);
    return true;
  }

  liberar(producto: string, cantidad: number): void {
    const disponibles = this.existencias.get(producto) ?? 0;
    this.existencias.set(producto, disponibles + cantidad);
    console.log(`Inventario: liberadas ${cantidad} unidades de ${producto}.`);
  }
}

/** Subsistema que simula el cobro del pedido. */
class PasarelaDePago {
  cobrar(total: number): boolean {
    console.log(`Pago: procesando un cobro de $${total.toFixed(2)}.`);
    return total > 0;
  }
}

/** Subsistema que simula el envio de la confirmacion al cliente. */
class ServicioDeCorreo {
  enviarConfirmacion(correo: string, producto: string): void {
    console.log(`Correo: confirmacion de ${producto} enviada a ${correo}.`);
  }
}

/** Coordina los subsistemas necesarios para completar una compra. */
class CompraFacade {
  private inventario = new Inventario();
  private pasarelaDePago = new PasarelaDePago();
  private servicioDeCorreo = new ServicioDeCorreo();

  procesarPedido(pedido: Pedido): boolean {
    if (
      !pedido.producto.trim() ||
      !pedido.correo.trim() ||
      !Number.isInteger(pedido.cantidad) ||
      pedido.cantidad <= 0 ||
      !Number.isFinite(pedido.precioUnitario) ||
      pedido.precioUnitario <= 0
    ) {
      console.log('%cPedido inválido: revisa sus datos.', COLORS.red);
      return false;
    }

    const total = pedido.cantidad * pedido.precioUnitario;
    if (!Number.isFinite(total)) {
      console.log('%cPedido inválido: el total no es válido.', COLORS.red);
      return false;
    }

    if (!this.inventario.reservar(pedido.producto, pedido.cantidad)) {
      console.log(
        `%cNo hay existencias suficientes de ${pedido.producto}.`,
        COLORS.red,
      );
      return false;
    }

    if (!this.pasarelaDePago.cobrar(total)) {
      this.inventario.liberar(pedido.producto, pedido.cantidad);
      console.log('%cNo fue posible procesar el pago.', COLORS.red);
      return false;
    }

    this.servicioDeCorreo.enviarConfirmacion(pedido.correo, pedido.producto);
    console.log('%cCompra completada.', COLORS.green);
    return true;
  }
}

function main(): void {
  const compra = new CompraFacade();

  console.log('%cProcesando una compra', COLORS.blue);
  compra.procesarPedido({
    producto: 'Cuaderno',
    cantidad: 2,
    precioUnitario: 12000,
    correo: 'daniela@example.com',
  });

  console.log('\n%cIntentando comprar más unidades de las disponibles', COLORS.blue);
  compra.procesarPedido({
    producto: 'Lapiz',
    cantidad: 5,
    precioUnitario: 2500,
    correo: 'daniela@example.com',
  });
}

main();
