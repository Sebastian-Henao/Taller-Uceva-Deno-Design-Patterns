import { COLORS } from '../../../helpers/colors.ts';

interface AlmacenamientoNube {
    subir(nombreArchivo: string): void;
}

class GoogleDriveService {
    crearArchivo(nombre: string, carpertaId: string): void {
        console.log(`%c[Google Drive] Archivo "${nombre}" creado en la carpeta ${carpertaId}`, COLORS.red);
    }
}

class DropBoxService {
    subirArchivo(ruta: string): void {
        console.log(`%c[DropBox] Archivo subido a la ruta ${ruta}`, COLORS.blue);
    }
}

class OneDriveService {
    guardarArchivo(nombreArchivo: string): void {
        console.log(`%c[OneDrive] Archivo "${nombreArchivo}" guardado en OneDrive`, COLORS.green);
    }
}

class GoogleDriveAdapter implements AlmacenamientoNube {
    private googleDriveService = new GoogleDriveService();
    subir(nombreArchivo: string): void {
        this.googleDriveService.crearArchivo(nombreArchivo, "root");
    }
}

class DropBoxAdapter implements AlmacenamientoNube {
    private dropBoxService = new DropBoxService();
    subir(nombreArchivo: string): void {
        this.dropBoxService.subirArchivo(`/${nombreArchivo}`);
    }
}

class OneDriveAdapter implements AlmacenamientoNube {
    private oneDriveService = new OneDriveService();
    subir(nombreArchivo: string): void {
        this.oneDriveService.guardarArchivo(nombreArchivo);
    }
}

function main() {
    const nombreArchivo = 'informe.pdf';
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