export class Participant {
    constructor(nombre, vehiculo, primero, segundo, tercero, fuera_de_podio) {
        this.nombre = nombre;
        this.vehiculo = vehiculo;
        this.primero = primero || 0;
        this.segundo = segundo || 0;
        this.tercero = tercero || 0;
        this.fuera_de_podio = fuera_de_podio || 0;
    }
}