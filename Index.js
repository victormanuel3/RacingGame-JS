import { customInputs, Validator } from "./Library.js";

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

// VEHICLE FORMULARY ----------------------

const vehicle_model = inputs.initDropdown('vehicles-datalist', {
    placeholder: 'Modelo del vehículo',
    width: '198px',
    items: [
        'Opción 1',
        'Opción 2',
        'Opción 3'
    ],
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
const traction = inputs.initSelect('traction', {
    width: '198px',
    items: [
        'Dura',
        'Media',
        'Blanda'
    ]
})
const speed_min = inputs.initInputNumber('speed-min', {
    placeholder: 'Velocidad mínima',
})
const speed_max = inputs.initInputNumber('speed-max', {
    placeholder: 'Velocidad máxima',
})

// PARTICIPANT FORMULARY ----------------------

const name_participant = inputs.initDropdown('name-participant', {
    placeholder: 'Nombre del participante',
    width: '198px',
    items: [
        'Opción 1',
        'Opción 2',
        'Opción 3'
    ],
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
    items: [
        'A',
        'B'
    ]
})







// VALIDATE ---------------------------------------------------------------------------------------
document.getElementById("validate-vehicle").addEventListener("click", () => {
    // let modelo = document.querySelector("#vehicles-datalist > input").value.trim()
    // let color_vehicle = document.querySelector("#color-datalist > input").value.trim()
    // let traction = document.querySelector("#traction > button").textContent.trim()
    // let speed_min = document.querySelector("#speed-min > input").value.trim()
    // let speed_max = document.querySelector("#speed-max > input").value.trim()
    // let type_vehicle = document.querySelector("#type-vehicle-select > button").textContent.trim()

    const validate = new Validator({
        'vehicles-datalist': {
            required: true      
        },
        'color-datalist': {
            required: true      
        },
        'traction': {
            required: true      
        },
        'speed-min': {
            required: true      
        },
        'speed-max': {
            required: true      
        },
        'type-vehicle-select': {
            required: true      
        },
    })
    validate.validateAll()
})

// PARTICIPANT FORMULARY ----------------------



// const myInputText = inputs.initInputText('input-text', {
//     placeholder: "Introduce el nombre"
// })

// document.getElementById("validate").addEventListener("click", () => {
//     const validate = new Validator({
//         'wrapper-select': {
//             required: true      
//         } 
//     })
//     validate.validateAll()
// })













// Manejar cambios de color
// document.querySelector('#color-datalist > input').addEventListener('input', (e) => {
//     console.log("CAMBIA ALGO EN EL INPUT")
//     let value = e.target.value
//     let colores = [
//         {nombre: 'Azul Eléctrico Intenso', color: '#001AFF'},
//         {nombre: 'Naranja Profundo', color: '#FF8000'},
//         {nombre: 'Verde Azulado Oscuro', color: '#00665E'},
//         {nombre: 'Azul Marino Profundo', color: '#223971'},
//         {nombre: 'Turquesa Verde Cercano', color: '#00A19C'},
//         {nombre: 'Azul Celeste Brillante', color: '#00A3E0'},
//         {nombre: 'Rojo Carmesí Oscuro', color: '#A6051A'}
//     ]
//     const selectedColor = colores.find((color) => {
//         color.nombre == value
//     }) 

//     if (selectedColor) {
//         car.setCarColor(selectedColor.color);
//     }
// });

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
        console.info("ENTRA AQUI")
        car.setCarColor(colorSeleccionado.color)
    }
})