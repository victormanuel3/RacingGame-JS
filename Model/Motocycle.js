import { Vehicle } from './Vehicle.js'
    
export class Motocycle extends Vehicle {
    constructor(modelo, color, traccion, velocidad_min, velocidad_max) {
        super(modelo, color, traccion, velocidad_min, velocidad_max);
        this.caida = false;
    }

    avance() {
        let traccion = this.traccion.toLowerCase().trim()

        let aumentar_velocidad =
            traccion == "dura" ? 5 : traccion == "media" ? 2 : 0;

        let velocidad_max = this.velocidad_max;
        let velocidad_min = this.velocidad_min;

        return this.caida ? 0
            : Math.floor(
                  Math.random() * (velocidad_max - velocidad_min + 1) +
                      velocidad_min
              ) + aumentar_velocidad;
    }

    ifFall(terreno) {
        let traccion = this.traccion.toLowerCase().trim()
        let porcentajes_caida = {
            mojado: { blanda: 0.5, media: 0.20, dura: 0.30 },
            humedo: { blanda: 0.2, media: 0.10, dura: 0.20 },
            seco: { blanda: 0.5, media: 0.5, dura: 0.5 },
        };
        let porcentaje = porcentajes_caida[terreno][traccion];

        return Math.random() < porcentaje
    }
}