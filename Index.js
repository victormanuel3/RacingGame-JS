import { Car } from "./Model/Car.js"
import { Motocycle } from "./Model/Motocycle.js"
import { Participant } from "./Model/Participant.js"
import { Circuit } from "./Model/Circuit.js"
import { customInputs, Validator } from "./Library.js";
import { Vehicle } from "./Model/Vehicle.js";

class F1_CAR_IMAGE {
    constructor(wrapper_car) {
        this.wrapper = document.getElementById(wrapper_car)
        this.loadSVG();
    }

    async loadSVG() {
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
        if (this.svg) {
            this.svg.style.setProperty('--car-color', color)
            document.documentElement.style.setProperty('--car-color', color);
        }
    }
}
// Inicializar
const car = new F1_CAR_IMAGE('wrapper-f1-car');

const inputs = new customInputs();


// LÓGICA ----------------------

let vehicles = [
    new Car("Mercedes", "dura", 80, 160),
    new Car("Red Bull", "dura", 85, 165),
    new Car("Ferrari", "media", 75, 155),
    new Motocycle("Honda", "blanda", 60, 120),
    new Motocycle("Yamaha", "blanda", 65, 125),
    new Motocycle("Ducati", "media", 70, 130),
];

let participants = [
    new Participant("Lewis Hamilton", vehicles[0], 3, 5, 2, 1),
    new Participant("Max Verstappen", vehicles[1], 8, 2, 0, 0),
    new Participant("Charles Leclerc", vehicles[2], 2, 4, 3, 3),
    new Participant("Marc Márquez", vehicles[3], 5, 3, 2, 1),
    new Participant("Fabio Quartararo", vehicles[4], 4, 4, 1, 2),
    new Participant("Francesco Bagnaia", vehicles[5], 6, 2, 3, 0),
];

let circuits = [
    new Circuit("Circuito de Mónaco", "húmedo", 1000),
    new Circuit("Spa-Francorchamps", "lluvioso", 1300),
    new Circuit("Autódromo de Mugello", "seco", 1100)
]

// VEHICLE FORMULARY ----------------------

const vehicle_model = inputs.initDropdown('vehicles-datalist', {
    placeholder: 'Modelo del vehículo',
    width: '198px',
    items: vehicles.map((vehicle) => ({
        label: vehicle.modelo,
        type: vehicle instanceof Motocycle ? 'Moto' : 'Coche'
    }))
});
const typeVehicle = inputs.initSelect('type-vehicle-select', {
    placeholder: 'Tipo del vehículo',
    width: '198px',
    items: [
        'Moto',
        'Coche'
    ]
})
const color_vehicle = inputs.initDropdown('color-datalist', {
        width: '198px',
        placeholder: 'Color del vehículo',
        items: [
            {label: 'Azul Eléctrico Intenso', type: '<i class="fa-solid fa-square" style="color: #001AFF;"></i>'},
            {label: 'Naranja Profundo', type: '<i class="fa-solid fa-square" style="color: #FF8000;"></i>'},
            {label: 'Verde Azulado Oscuro', type: '<i class="fa-solid fa-square" style="color: #00665E;"></i>'},
            {label: 'Azul Marino Profundo', type: '<i class="fa-solid fa-square" style="color: #223971;"></i>'},
            {label: 'Turquesa Verde Cercano', type: '<i class="fa-solid fa-square" style="color: #00A19C;"></i>'},
            {label: 'Azul Celeste Brillante', type: '<i class="fa-solid fa-square" style="color: #00A3E0;"></i>'},
            {label: 'Rojo Carmesí Oscuro', type: '<i class="fa-solid fa-square" style="color: #A6051A;"></i>'}
        ],
})
const traction = inputs.initSelect('vehicle-traction', {
    width: '198px',
    items: [
        'Dura',
        'Media',
        'Blanda'
    ],
})
const speed_min = inputs.initInputNumber('speed-min', {
    placeholder: 'VelMin',
})
const speed_max = inputs.initInputNumber('speed-max', {
    placeholder: 'VelMax',
})

// PARTICIPANT FORMULARY ----------------------

const name_participant = inputs.initDropdown('name-participant', {
    placeholder: 'Nombre del participante',
    width: '198px',
    items: participants.map((participant) => participant.nombre)
});

const equipment = inputs.initDropdown('equipment', {
    width: '198px',
    placeholder: 'Color de la quipación',
    items: [
        {label: 'Azul Eléctrico Intenso', type: '<i class="fa-solid fa-square" style="color: #001AFF;"></i>'},
        {label: 'Naranja Profundo', type: '<i class="fa-solid fa-square" style="color: #FF8000;"></i>'},
        {label: 'Verde Azulado Oscuro', type: '<i class="fa-solid fa-square" style="color: #00665E;"></i>'},
        {label: 'Azul Marino Profundo', type: '<i class="fa-solid fa-square" style="color: #223971;"></i>'},
        {label: 'Turquesa Verde Cercano', type: '<i class="fa-solid fa-square" style="color: #00A19C;"></i>'},
        {label: 'Azul Celeste Brillante', type: '<i class="fa-solid fa-square" style="color: #00A3E0;"></i>'},
        {label: 'Rojo Carmesí Oscuro', type: '<i class="fa-solid fa-square" style="color: #A6051A;"></i>'}
    ],
})

const available_vehicles = inputs.initSelect('available-vehicles', {
    placeholder: 'Vehículo',
    width: '198px',
    items: vehicles.map((vehicle) => ({
        type: vehicle.modelo,
        value: vehicle instanceof Motocycle ? 'Moto' : 'Coche'
    }))
})



// CIRCUIT FORMULARY ----------------------

const circuit_name = inputs.initInputText('circuit-name', {
    placeholder: 'Nombre del circuito',
    width: '198px'
})

const circuit_length = inputs.initInputNumber('circuit-length', {
    placeholder: 'Longitud del circuito',
})

const circuit_time = inputs.initSelect('circuit-time', {
    placeholder: 'Tiempo en el circuito',
    width: '198px',
    items: [
        'Lluvioso',
        'Humedo',
        'Seco'
    ]
})




// MENU FUNCIONAL ---------------------------------------------------------------------------------------


let menuFormularys = document.querySelectorAll("nav > ul > li");

const defaultButton = menuFormularys[0];

let elements_first_button = defaultButton.querySelectorAll("*");
elements_first_button.forEach((element) => {
    element.classList.add('button-selected')
})

const defaultTargetId = defaultButton.getAttribute('data-target');
document.getElementById(defaultTargetId).classList.add('visible');

menuFormularys.forEach((button) => {
    button.addEventListener("click", () => {
        // Resetear todos los menús
        menuFormularys.forEach((button) => {
            let span_svg = button.querySelectorAll("*")
            span_svg.forEach((element) => {
                if (element.tagName == 'svg') {
                    element.querySelector('PATH').style.fill = 'white'
                }
                element.classList.remove('button-selected')
            })
        });

         // Ocultar todos los formularios
        document.querySelectorAll('.formulary').forEach(f => f.classList.remove('visible'));
        
        let span_svg = button.querySelectorAll("*");
        span_svg.forEach((element) => {
            if (element.tagName == 'svg') {
                element.querySelector('PATH').style.fill = '#FFE600'
            }
            element.classList.add('button-selected')
        })

        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('visible');
    }) 
})


// VALIDATE -----------------------------------------------------------------------





// CAMBIO COLOR COCHE ----------------------------------------------

document.querySelector('#color-datalist > input').addEventListener('change', (e) => {
    let value = e.target.value
    
    let colores = [
        {nombre: 'Azul Eléctrico Intenso', color: '#001AFF'},
        {nombre: 'Naranja Profundo', color: '#FF8000'},
        {nombre: 'Verde Azulado Oscuro', color: '#00665E'},
        {nombre: 'Azul Marino Profundo', color: '#223971'},
        {nombre: 'Turquesa Verde Cercano', color: '#00A19C'},
        {nombre: 'Azul Celeste Brillante', color: '#00A3E0'},
        {nombre: 'Rojo Carmesí Oscuro', color: '#A6051A'}
    ]
    
    const colorSeleccionado = colores.find(color => color.nombre === value)

    if (colorSeleccionado) {
        car.setCarColor(colorSeleccionado.color)
    }
})