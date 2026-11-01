import { COLORS } from '../../../helpers/colors.ts';

/**
 * Patron de diseño: Adapter
 * Tema para el taller: almacenamiento de archivos en la nube
 *
 * ¿Que hace el patron?
 * Permite que clases con interfaces diferentes trabajen a traves de una
 * interfaz comun, sin tener que modificar las clases existentes.
 *
 * ¿Que problema se resuelve?
 * Cada servicio de almacenamiento ofrece una operacion distinta:
 * Google Drive crea archivos, DropBox los sube usando una ruta y OneDrive
 * los guarda por nombre. El cliente no deberia tener que conocer esas diferencias.
 *
 * ¿Por que el patron Adapter es adecuado para este problema?
 * Porque cada adaptador traduce la operacion comun "subir" al metodo y los
 * parametros que necesita cada servicio. Asi, el cliente puede usar cualquiera
 * de los servicios a traves de la misma interfaz AlmacenamientoNube.
 */

/** Interfaz comun que el cliente utiliza para subir archivos. */
interface AlmacenamientoNube {
    subir(nombreArchivo: string): void;
}

/** Servicio existente de Google Drive, con una interfaz propia. */
class GoogleDriveService {
    crearArchivo(nombre: string, carpertaId: string): void {
        console.log(`%c[Google Drive] Archivo "${nombre}" creado en la carpeta ${carpertaId}`, COLORS.red);
    }
}

/** Servicio existente de DropBox, con una interfaz propia. */
class DropBoxService {
    subirArchivo(ruta: string): void {
        console.log(`%c[DropBox] Archivo subido a la ruta ${ruta}`, COLORS.blue);
    }
}

/** Servicio existente de OneDrive, con una interfaz propia. */
class OneDriveService {
    guardarArchivo(nombreArchivo: string): void {
        console.log(`%c[OneDrive] Archivo "${nombreArchivo}" guardado en OneDrive`, COLORS.green);
    }
}

/** Adapta "subir" a la operacion y los parametros que espera Google Drive. */
class GoogleDriveAdapter implements AlmacenamientoNube {
    private googleDriveService = new GoogleDriveService();
    subir(nombreArchivo: string): void {
        this.googleDriveService.crearArchivo(nombreArchivo, "root");
    }
}

/** Adapta "subir" a DropBox, convirtiendo el nombre en una ruta. */
class DropBoxAdapter implements AlmacenamientoNube {
    private dropBoxService = new DropBoxService();
    subir(nombreArchivo: string): void {
        this.dropBoxService.subirArchivo(`/${nombreArchivo}`);
    }
}

/** Adapta "subir" al metodo para guardar archivos de OneDrive. */
class OneDriveAdapter implements AlmacenamientoNube {
    private oneDriveService = new OneDriveService();
    subir(nombreArchivo: string): void {
        this.oneDriveService.guardarArchivo(nombreArchivo);
    }
}

function main() {
    const nombreArchivo = 'informe.pdf';

    /** El cliente programa contra la interfaz comun, no contra cada servicio. */
    const googleDrive: AlmacenamientoNube = new GoogleDriveAdapter();
    const dropBox: AlmacenamientoNube = new DropBoxAdapter();
    const oneDrive: AlmacenamientoNube = new OneDriveAdapter();

    console.log('Subiendo archivo a Google Drive:');
    googleDrive.subir(nombreArchivo);

    console.log('\nSubiendo archivo a DropBox:');
    dropBox.subir(nombreArchivo);

    console.log('\nSubiendo archivo a OneDrive:');
    oneDrive.subir(nombreArchivo);
}

main();