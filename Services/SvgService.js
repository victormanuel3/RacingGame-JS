export class F1_CAR_IMAGE {
    constructor(wrapper_car) {
        this.wrapper = document.getElementById(wrapper_car)
        this.loadSVG();
    }

    async loadSVG() {
        if (this.svg) return; // Evita cargar el SVG múltiples veces

        console.info("SE CARGO LOAD SVG")
        try {
            const response = await fetch('./F1/F1-CAR.svg');
            const svgText = await response.text();

            this.wrapper.innerHTML = svgText

            this.svg = this.wrapper.querySelector("svg")

        } catch (error) {
            console.log("Error al cargar la imagen "+error)
        }
    }
    
    setCarColor(color) {
        console.log(color)
        if (this.svg) {
            console.info("INTENTA CAMBIAR EL COLOR")
            this.svg.style.setProperty('--car-color', color)
            document.documentElement.style.setProperty('--car-color', color);
        }
    }
}
export class MOTOCYCLE_IMAGE {
    constructor(wrapper_car) {
        this.wrapper = document.getElementById(wrapper_car)
        this.loadSVG();
    }
    async loadSVG() {
        if (this.svg) return; // Evita cargar el SVG múltiples veces

        console.info("SE CARGO LOAD SVG")
        try {
            const response = await fetch('./F1/MOTOCYCLE.svg');
            const svgText = await response.text();

            this.wrapper.innerHTML = svgText

            this.svg = this.wrapper.querySelector("svg")

        } catch (error) {
            console.log("Error al cargar la imagen "+error)
        }
    }
    
    setMotocyleColor(color) {
        console.log(color)
        if (this.svg) {
            console.info("INTENTA CAMBIAR EL COLOR")
            this.svg.style.setProperty('--motocycle-color', color)
            document.documentElement.style.setProperty('--car-color', color);
        }
    }

    setEquipmentColor(color) {
        console.log(color)
        if (this.svg) {
            console.info("INTENTA CAMBIAR EL COLOR")
            this.svg.style.setProperty('--color-equipment', color)
            document.documentElement.style.setProperty('--car-color', color);
        }
    }
}