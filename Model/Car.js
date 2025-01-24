import { Vehicle } from './Vehicle.js'

export class Car extends Vehicle {
    constructor(modelo, traccion, velocidad_min, velocidad_max) {
        super(modelo, traccion, velocidad_min, velocidad_max);
    }

    avance(tiempo) {
        let aumentar_velocidad = {
            lluvioso: { blanda: 4, media: 2, dura: 0 },
            humedo: { blanda: 2, media: 2, dura: 2 },
            seco: { blanda: 0, media: 2, dura: 4 },
        };
        let velocidad_max = this.velocidad_max;
        let velocidad_min = this.velocidad_min;

        return (
            Math.floor(
                Math.random() * (velocidad_max - velocidad_min + 1) +
                    velocidad_min
            ) + aumentar_velocidad[tiempo][this.traccion]
        );
    }
}