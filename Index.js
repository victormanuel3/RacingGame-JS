import { Car } from "./Model/Car.js"
import { Motocycle } from "./Model/Motocycle.js"
import { Participant } from "./Model/Participant.js"
import { Circuit } from "./Model/Circuit.js"
import { customInputs } from "./Library.js";
import { F1_CAR_IMAGE, MOTOCYCLE_IMAGE } from "./Services/SvgService.js"
import { showSuccessAlert, showErrorAlert, initCloseModal } from "./Utils/Alert.js"

// Obtener imagen
const car = new F1_CAR_IMAGE('wrapper-f1-car');

const inputs = new customInputs();

initCloseModal()

// LÓGICA ----------------------


let vehicles = [
    new Car("Mercedes", '#00A19C', "dura", 80, 160),
    new Car("Red Bull", '#FF8000', "dura", 85, 165),
    new Car("Ferrari", '#00A3E0', "media", 75, 175),
    new Motocycle("Honda", '#001AFF', "blanda", 60, 120),
    new Motocycle("Yamaha", '#223971', "blanda", 65, 125),
    new Motocycle("Ducati", '#00A3E0', "media", 70, 130),
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
    new Circuit("Circuito de Mónaco", "humedo", 2000),
    new Circuit("Spa-Francorchamps", "lluvioso", 1300),
    new Circuit("Autódromo de Mugello", "seco", 1100)
]

// VEHICLE FORMULARY ----------------------

function fillDropdownVehicle() {
    inputs.initDropdown('vehicles-datalist', {
        placeholder: 'Modelo del vehículo',
        width: '198px',
        items: vehicles.map((vehicle) => ({
            label: vehicle.modelo,
            type: vehicle instanceof Motocycle ? 'Moto' : 'Coche'
        }))
    });
}
fillDropdownVehicle()

inputs.initDropdown('color-datalist', {
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

inputs.initMultipleSelects({
    'vehicle-traction': {
        placeholder: 'Selecciona la tracción',
        width: '198px',
        items: [
            'Dura',
            'Media',
            'Blanda'
        ],
    },
    'type-vehicle-select': {
        placeholder: 'Tipo del vehículo',
        width: '198px',
        items: [
            'Moto',
            'Coche'
        ]
    }
})

inputs.initInputNumber('speed-min', {
    placeholder: 'Vel min',
})
inputs.initInputNumber('speed-max', {
    placeholder: 'Vel max',
})

// PARTICIPANT FORMULARY ----------------------

function fillDropdownParticipants() {
    inputs.initDropdown('name-participant', {
        placeholder: 'Nombre del participante',
        width: '198px',
        items: participants.map((participant) => participant.nombre)
    });
}
fillDropdownParticipants()

inputs.initDropdown('equipment', {
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

function fillAvailableVehicles() {
    inputs.initSelect('available-vehicles', {
        placeholder: 'Vehículo',
        width: '198px',
        items: vehicles.map((vehicle) => ({
            label: vehicle.modelo,
            type: vehicle instanceof Motocycle ? 'Moto' : 'Coche'
        }))
    })
}
fillAvailableVehicles()

// CIRCUIT FORMULARY ----------------------

inputs.initInputText('circuit-name', {
    placeholder: 'Nombre del circuito',
    width: '198px'
})

inputs.initInputNumber('circuit-length', {
    placeholder: 'Longitud del circuito',
})

inputs.initSelect('circuit-time', {
    placeholder: 'Tiempo en el circuito',
    width: '198px',
    items: [
        'Lluvioso',
        'Humedo',
        'Seco'
    ]
})

// ASSIGN PARTICIPANTS TO CIRCUIT FORMULARY

inputs.initDropdown('dropdown-circuits', {
    placeholder: 'Circuito',
    width: '235px',
    items: circuits.map((circuit) => circuit.nombre)
})
inputs.initDropdown('dropdown-participants', {
    placeholder: 'Añadir participante',
    width: '235px',
    items: participants.map((participant) => participant.nombre)
})

// LOAD CIRCUIT

inputs.initDropdown('dropdown-load-circuit', {
    placeholder: 'Elije el circuito que deseas cargar',
    width: '400px',
    items: circuits.map((circuit) => circuit.nombre)
})

// MENU FUNCIONAL ---------------------------------------------------------------------------------------


let menuFormularys = document.querySelectorAll("nav > ul > li");

const defaultButton = menuFormularys[0];

let elements_first_button = defaultButton.querySelectorAll("*");
elements_first_button.forEach((element) => {
    element.classList.add('button-selected')
})
let activeFormulary = 'create-vehicle';

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

        // Reset statistics
        document.getElementById("show-statistics").innerHTML = '';

        // Reset car color
        car.setCarColor('#001AFF')

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
        activeFormulary = targetId;
        document.getElementById(targetId).classList.add('visible');

        if (targetId == 'create-circuit') {
            document.getElementById("load-statistics").style.display = 'none'
        } else {
            document.getElementById("load-statistics").style.display = 'inline'
        }
    }) 
})

// CAMBIO COLOR COCHE ----------------------------------------------

const colores = [
    {nombre: 'Azul Eléctrico Intenso', color: '#001AFF'},
    {nombre: 'Naranja Profundo', color: '#FF8000'},
    {nombre: 'Verde Azulado Oscuro', color: '#00665E'},
    {nombre: 'Azul Marino Profundo', color: '#223971'},
    {nombre: 'Turquesa Verde Cercano', color: '#00A19C'},
    {nombre: 'Azul Celeste Brillante', color: '#00A3E0'},
    {nombre: 'Rojo Carmesí Oscuro', color: '#A6051A'}
]

document.querySelector('#color-datalist > input').addEventListener('change', (e) => {
    let value = e.target.value
    
    const colorSeleccionado = colores.find(color => color.nombre === value)

    if (colorSeleccionado) {
        car.setCarColor(colorSeleccionado.color)
    }
})

// CREATE ENTITY -----------------------------------------------------------------------

document.getElementById("create-entity").addEventListener("click", () => {
    switch (activeFormulary) {
        case 'create-vehicle':
            createVehicle()
            break;
        case 'create-participant':
            createParticipant();
            break;
        case 'create-circuit':
            createCircuit()
            break;
        default:
            break;
    }
})

document.getElementById("load-statistics").addEventListener("click", () => {
    switch (activeFormulary) {
        case 'create-vehicle':
            load_statistics('vehicle');
            break;
        case 'create-participant':
            load_statistics('participant');
            break;
        case 'create-circuit':
            createCircuit()
            break;
        default:
            break;
    }
})

function existEntity(array, value, propertyName) {
    let exist = array.find((object) => {
        return object[propertyName].toLowerCase() === value.toLowerCase()
    });
    return exist
}

// CREATE ENTITYS -------------------------

function createParticipant() { 
    let name = document.querySelector("#name-participant input").value.trim();
    let vehicle = document.querySelector("#available-vehicles button").textContent.trim();
    let equipment = document.querySelector("#equipment input").value.trim()

    if (name || vehicle || equipment) {
        if (!name)
            showErrorAlert("El nombre del participante es obligatorio.")
        else if (existEntity(participants, name, 'nombre'))
            showErrorAlert("El participante ya existe, solo puedes ver sus estadísticas.")
        else if (!vehicle)
            showErrorAlert("Debes añadirle un vehículo al participante.")
        else if (!equipment)
            showErrorAlert("Debes añadirle un color a la equipación del participante.")
        else {
            clearFields([
                '#name-participant', '#available-vehicles', '#equipment'
            ])
            showSuccessAlert("El participante ha sido creado exitosamente.")
            
            participants.push(new Participant(name, existEntity(vehicles, vehicle, 'modelo'), 0, 0, 0, 0)) 
            fillDropdownParticipants()
        }
    } else 
        showErrorAlert("Los campos deben ser rellenados para crear el participante.")
}


function createVehicle() {
    let model = document.querySelector('#vehicles-datalist input').value.trim()
    let color = document.querySelector('#color-datalist input').value.trim()
    let traction = document.querySelector('#vehicle-traction button').textContent.trim()
    let vel_min = Number(document.querySelector('#speed-min input').value.trim());
    let vel_max = Number(document.querySelector('#speed-max input').value.trim());
    let type = document.querySelector('#type-vehicle-select button').textContent.trim()


    if(model || color || traction || vel_min || vel_max || type) {
        if (!model)
            showErrorAlert("El campo del modelo es obligatorio.")
        else if (existEntity(vehicles, model, 'modelo'))
            showErrorAlert("El vehículo ya existe, solo puedes ver sus estadísticas.")
        else if (!color)
            showErrorAlert("El campo del color es obligatorio.")
        else if (!existEntity(colores, color, 'nombre'))
            showErrorAlert("Debes añadir un color disponible al vehículo.")
        else if (!traction)
            showErrorAlert("El campo de la tracción es obligatorio.")
        else if (!vel_min || !vel_max)
            showErrorAlert("La velocidad máxima y mínima del vehículo son obligatorias.")
        else if (vel_min < 50 || vel_min > 200)
            showErrorAlert("La velocidad mínima debe estar entre 50 y 400 km/h.")
        else if (vel_max > 400 || vel_max < 50)
            showErrorAlert("La velocidad máxima debe estar entre 50 y 400 km/h.")
        else if (!type)
            showErrorAlert("El campo del tipo es obligatorio.")
        else {
            clearFields([
                '#vehicles-datalist', '#color-datalist', '#vehicle-traction', '#speed-min', '#speed-max', '#type-vehicle-select'
            ]);
            showSuccessAlert("El vehículo ha sido creado exitosamente.")
            let color_vehicle = existEntity(colores, color, 'nombre')
            if (type === 'Moto') {
                vehicles.push(new Motocycle(model, color_vehicle.color, traction, vel_min, vel_max))
            } else if (type === 'Coche') {
                vehicles.push(new Car(model, color_vehicle.color, traction, vel_min, vel_max))
            }
            console.info(vehicles)
            fillDropdownVehicle()
            fillAvailableVehicles()
            car.setCarColor('#001AFF')
        }
    }else {
        showErrorAlert("Los campos deben ser rellenados para crear el vehículo.")
    }
}


function createCircuit() {
    let circuit_name = document.querySelector("#circuit-name input").value.trim()
    let circuit_length = document.querySelector("#circuit-length input").value.trim()
    let circuit_time = document.querySelector("#circuit-time button").textContent.trim()
    
    console.log(circuits)
    if (circuit_name || circuit_length || circuit_time) {
        if (!circuit_name)
            showErrorAlert("El nombre del circuito es obligatorio.")
        else if (existEntity(circuits, circuit_name, 'nombre'))
            showErrorAlert("Este circuito ya existe.")
        else if (!circuit_length)
            showErrorAlert("Debes añadir la longitud del circuito.")
        else if (circuit_length < 1000)
            showErrorAlert("La longitud mínima de un circuito es de 1000 km")
        else if (!circuit_time)
            showErrorAlert("Debes especificar el tiempo del circuito.")
        else {
            clearFields(['#circuit-name', '#circuit-length', '#circuit-time', '#dropdown-circuits'])
            showSuccessAlert("El circuito ha sido creado exitosamente.")
            circuits.push(new Circuit(circuit_name, circuit_time, circuit_length))
        }
    } else 
        showErrorAlert("Los campos deben ser rellenados para crear un circuito.")
}

function clearFields(selectors) {
    selectors.forEach((selector) => {
        const f = document.querySelector(selector);
        const input = f.querySelector('button, input');
        
        if (input.tagName === 'BUTTON') {
            const placeholderSpan = input.querySelector('span[data-placeholder]');
            placeholderSpan.textContent = '';
        } else if (input.tagName === 'INPUT') {
            input.value = '';
        }
    })
}

// LOAD STATISTICS --------------------------------------------

function load_statistics(entity) {
    if (entity == 'vehicle') {
        let model = document.querySelector('#vehicles-datalist input').value.trim()
        if (existEntity(vehicles, model, 'modelo')) {
            let vehicle = vehicles.find((vehicle) => {
                return vehicle.modelo === model
            })
            let showStatistics = document.getElementById("show-statistics")
            showStatistics.classList.remove("participant-statistics")
            showStatistics.classList.add("vehicle-statistics")
            showStatistics.innerHTML = `
            <span>
                <span>Modelo:  </span>
                ${vehicle.modelo}
            </span>
            <span>
                <span>Tracción:  </span>
                ${vehicle.traccion}
            </span>
            <span>
                <span>Velocidad mínima:  </span>
                ${vehicle.velocidad_min}km
            </span>
            <span>
                <span>Velocidad máxima:  </span
                >${vehicle.velocidad_max}km
            </span>
            `
            car.setCarColor(vehicle.color)
            clearFields(["#vehicles-datalist"])
        } else
            showErrorAlert("Debes seleccionar un vehículo para poder ver sus estadísticas.")
    } else if (entity == 'participant') {
        let name = document.querySelector("#name-participant input").value.trim();
        if (existEntity(participants, name, 'nombre')) {
            let participant = participants.find((participant) => {
                return participant.nombre === name
            })
            let showStatistics = document.getElementById("show-statistics")
            showStatistics.classList.add("participant-statistics")
            showStatistics.classList.remove("vehicle-statistics")
            showStatistics.innerHTML = `
            <span>
            ${participant.segundo}
            <img src="./F1/SecondPlace.svg">
            </span>            
            <span class="first-place">
                ${participant.primero}
                <img src="./F1/FirstPlace.svg">
            </span>            
            <span>
                ${participant.tercero}
                <img src="./F1/ThirdPlace.svg">
            </span>            
            `
            clearFields(["#name-participant"])
        } else 
            showErrorAlert("Debes seleccionar un vehículo para poder ver sus estadísticas.")
    }
}

// ASSIGN PARTICIPANTS TO CIRCUIT -------------------------

document.getElementById("assign-participant").addEventListener("click", () => {
    let circuit = document.querySelector("#dropdown-circuits input").value.trim()
    let participant = document.querySelector("#dropdown-participants input").value.trim()

    if (circuit || participant) {
        if (!circuit)
            showErrorAlert("Debes seleccionar el circuito al que quieres añadir el participante.")
        else if (!participant)
            showErrorAlert("Debes seleccionar el participante que quieras al circuito.")
        else if (!existEntity(circuits, circuit, 'nombre'))
            showErrorAlert("Debes añadir un circuito correcto.")
        else if (!existEntity(participants, participant, 'nombre'))
            showErrorAlert("Debes añadir un participante que exista.")
        else if (existEntity(circuits, circuit, 'nombre').participants.length === 5) 
            showErrorAlert("No puedes añadir más de 5 participantes a un circuito.")
        else {
            let obj_circuit = existEntity(circuits, circuit, 'nombre')
            let obj_participant = existEntity(participants, participant, 'nombre')

            let exist_participant = obj_circuit.participants.some(p => p.nombre === participant);
            if (exist_participant) {
                showErrorAlert("Este participante ya ha sido añadido a este circuito.")
            } else {
                obj_circuit.participants.push(obj_participant)
                clearFields(["#dropdown-circuits", "#dropdown-participants"])
                showSuccessAlert("El participante ha sido agregado al circuito.")
            }
        }
    } else 
        showErrorAlert("Debes seleccionar el circuito y el participante que quieres añadir.")
})

document.getElementById("remove-participant").addEventListener("click", () => {
    let circuit = document.querySelector("#dropdown-circuits input").value.trim()
    let participant = document.querySelector("#dropdown-participants input").value.trim()

    if (circuit || participant) {
        if (!circuit)
            showErrorAlert("Debes seleccionar el circuito del cual deseas realizar la operación.")
        else if (!participant)
            showErrorAlert("Debes seleccionar el participante que deseas eliminar")
        else if (!existEntity(circuits, circuit, 'nombre'))
            showErrorAlert("Debes añadir un circuito correcto.")
        else if (!existEntity(participants, participant, 'nombre'))
            showErrorAlert("Debes seleccionar un participante existente.")
        else if (existEntity(circuits, circuit, 'nombre').participants.length === 0)
            showErrorAlert("No hay ningún participante asignado al circuito.")
        else { 
            let circuit_entity = existEntity(circuits, circuit, 'nombre');
            let exist_participant = circuit_entity.participants.some(p => p.nombre === participant)
            if (exist_participant) {
                const index = circuit_entity.participants.findIndex(p => p.nombre === participant);
                // Elimina el participante del array si existe
                if (index !== -1) {
                    circuit_entity.participants.splice(index, 1); 
                    clearFields(["#dropdown-circuits", "#dropdown-participants"])
                    showSuccessAlert("El participante ha sido quitado del circuito.");
                }
            } else {
                showSuccessAlert("El participante ha sido quitado del circuito.");
                showErrorAlert("Este participante no está vinculado en este circuito.")
            }
        }
    } else 
        showErrorAlert("Debes seleccionar el circuito y el participante que quieres quitar.")
})

// LOAD CIRCUIT WITH ITS DATA --------------------------------------------------------------------

let loaded_circuit = null;

document.querySelector("#load-circuit button").addEventListener("click", () => {
    let circuit = document.querySelector("#dropdown-load-circuit input").value.trim()
    if (circuit) {
        if (existEntity(circuits, circuit, 'nombre')) {
            loaded_circuit = existEntity(circuits, circuit, 'nombre');
            // <div class="circuit-data"></div>
            let container_game = document.getElementById("container-game")
            let circuit_data = document.createElement("div")
            circuit_data.innerHTML = `
            <span>${loaded_circuit.nombre}</span>
            <span><img src="./F1/ICONS/weather-icon.svg">${loaded_circuit.tiempo}</span>
            <span><i class="fa-sharp fa-solid fa-ruler"></i>${loaded_circuit.longitud}km</span>
            `
            circuit_data.classList.add("circuit-data")
            clearFields(["#dropdown-load-circuit"])
            container_game.appendChild(circuit_data)
            const btn_GAME = document.getElementById("GAME")
            btn_GAME.style.display = 'inline'

            // AÑADIMOS A LA VARIABLE EL CIRCUITO QUE SE HA CARGADO PARA SABER QUE JUEGO SE INICIA
            showTrackVechiles(loaded_circuit)
        } else
            showErrorAlert("Solo puedes cargar un circuito existente.")
    } else 
        showErrorAlert("Debes seleccionar el circuito que deseas cargar.")
})


function showTrackVechiles(circuit) {
    let container_game = document.getElementById("container-game");
    
    // Verifica si el contenedor ya existe
    let container_vehicles = document.getElementById("container-vehicles-circuit");
    if (!container_vehicles) {
        container_vehicles = document.createElement("div");
        container_vehicles.id = "container-vehicles-circuit";
        container_game.appendChild(container_vehicles);
    } else {
        // Si existe, vacía el contenido para evitar duplicados
        container_vehicles.innerHTML = '';
    }
    console.info("INTENTO MOSTRAR LOS PARTICIPANTES DEL CIRCUITO. ---------")
    console.info(circuit.participants)
    console.info(circuit.participants.vehiculo)
    console.info("---------------------------------------------------------")

    circuit.participants.forEach((p, index) => {
        // Contenedor relativo para el vehículo
        let vehicleWrapper = document.createElement('div');
        vehicleWrapper.classList.add('car-wrapper'); // Usa la misma clase genérica
        vehicleWrapper.id = `car-wrapper-${index}`;

        // Añadir clase específica si es una moto
        if (p.vehiculo instanceof Motocycle) {
            vehicleWrapper.classList.add('moto-wrapper');
        }

        container_vehicles.appendChild(vehicleWrapper);
    
        // Contenedor absoluto para el movimiento del vehículo
        let vehicleDiv = document.createElement('div');
        vehicleDiv.id = `car-${index}`;
        vehicleWrapper.appendChild(vehicleDiv);

        // Verifica el tipo de vehículo
        if (p.vehiculo instanceof Car) {
            let car = new F1_CAR_IMAGE(vehicleDiv.id);
            car.loadSVG().then(() => {
                car.setCarColor(p.vehiculo.color);

                let name_participant = document.createElement('p');
                name_participant.classList.add("name_participant");
                name_participant.innerText = p.nombre;

                vehicleDiv.appendChild(name_participant);
            });
        } else if (p.vehiculo instanceof Motocycle) {
            let moto = new MOTOCYCLE_IMAGE(vehicleDiv.id);
            moto.loadSVG().then(() => {
                moto.setMotocyleColor(p.vehiculo.color);
                

                let name_participant = document.createElement('p');
                name_participant.classList.add("name_participant");
                name_participant.innerText = p.nombre;

                vehicleDiv.appendChild(name_participant);
            });
        } else {
            console.warn(`El participante ${p.nombre} tiene un tipo de vehículo no reconocido.`);
        }
        car.setCarColor('#001AFF')
        
    });
}

const gameButton = document.getElementById("GAME");
let gameButtonDisabled = false

document.querySelector("#load-circuit input").addEventListener("change", () => {
    let circuit = document.querySelector("#load-circuit input").value
    let exist = existEntity(circuits, circuit, 'nombre');
    if (exist) {
        if (exist.participants.length === 0) {
            console.info("EL CIRCUIT EXISTE Y NO TIENE PARTICIPANTES")
            gameButtonDisabled = false;
            gameButton.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='173' height='49' viewBox='0 0 173 49' fill='rgb(199, 199, 199)' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.83801 47L18.9094 2H169.662L153.591 47H2.83801Z' stroke='rgb(199, 199, 199)' stroke-width='4'/%3E%3C/svg%3E")`;
            gameButton.style.color = 'rgb(141 141 141)';
        } else {
            console.info("EL CIRCUIT EXISTE Y TIENE PARTICIPANTES")
            gameButtonDisabled = true;
            gameButton.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='173' height='49' viewBox='0 0 173 49' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.83801 47L18.9094 2H169.662L153.591 47H2.83801Z' stroke='white' stroke-width='4'/%3E%3C/svg%3E")`;
            gameButton.style.color = 'black';
        }
    }
})

gameButton.addEventListener("click", () => {
    if (gameButtonDisabled) {
        if (loaded_circuit) {
            let load_circuit = document.getElementById("load-circuit")
            load_circuit.style.display = 'none'

            console.info("EMPIEZA EL JUEGO")
            startRace();
        } else {
            showErrorAlert("Debes cargar el circuito.")
            return
        }
    } else {
        showErrorAlert("El circuito no tiene participantes agregados.")
        clearFields("#dropdown-load-circuit")
        return
    }
});

function startRace() {
    let participants = loaded_circuit.participants;

    console.info("PARTICIPANTES QUE INTENTAN COMPETIR --------");
    console.info(participants);
    console.info("--------------------------------------------");

    let scaleFactor = window.innerWidth / loaded_circuit.longitud; // Escala para el movimiento en pantalla
    let finalPositions = participants.map(() => 0); // Array para registrar posiciones finales
    let fallTimers = {}; // Objeto para rastrear las caídas de las motos

    let interval = setInterval(() => {
        participants.forEach((participant, index) => {
            console.info("---------------------PARTICIPANT POR PARTICIPANT");
            console.info(participant);
            console.info(participant.vehiculo);
            console.info("---------------------");

            let carWrapper = document.getElementById(`car-wrapper-${index}`);
            let currentTransform = carWrapper.style.transform || "translateX(0px)";
            let currentLeft = parseFloat(currentTransform.replace("translateX(", "").replace("px)", ""));

            let advanceInPixels = 0; // Avance en píxeles por iteración

            // Verificar el tipo de vehículo y calcular el avance
            if (participant.vehiculo instanceof Motocycle) {
                // Verificar si la moto se cae
                if (!fallTimers[index]) {
                    if (participant.vehiculo.ifFall(loaded_circuit.tiempo)) {
                        console.log(`${participant.nombre} (moto) se ha caído! No puede avanzar por 5 segundos.`);
                        participant.vehiculo.caida = true;

                        // Temporizador de 5 segundos para la caída
                        fallTimers[index] = setTimeout(() => {
                            participant.vehiculo.caida = false;
                            fallTimers[index] = null; // Limpiar el temporizador
                            console.log(`${participant.nombre} (moto) se ha recuperado de la caída.`);
                        }, 5000);
                    }
                }

                // Si la moto no está caída, calcula el avance
                if (!participant.vehiculo.caida) {
                    let advance = participant.vehiculo.avance();
                    advanceInPixels = advance * scaleFactor; // Escalar el avance
                }
            } else if (participant.vehiculo instanceof Car) {
                // Avance normal para los coches
                let advance = participant.vehiculo.avance(loaded_circuit.tiempo);
                advanceInPixels = advance * scaleFactor; // Escalar el avance
            }

            let newLeft = currentLeft + advanceInPixels;

            // Usar transform en lugar de modificar directamente el estilo "left"
            carWrapper.style.transform = `translateX(${newLeft}px)`;

            // Verificar si el participante cruza la meta
            if (newLeft >= window.innerWidth && finalPositions[index] === 0) {
                finalPositions[index] = Math.max(...finalPositions) + 1;
                console.log(`${participant.nombre} llegó en la posición ${finalPositions[index]}`);
            }
        });

        // Si todos los participantes han cruzado la meta, finalizar la carrera
        if (finalPositions.filter(pos => pos > 0).length === participants.length) {
            clearInterval(interval);

            // Ordenar participantes por posición
            let sortedParticipants = participants
                .map((p, i) => ({ participant: p, position: finalPositions[i] }))
                .sort((a, b) => a.position - b.position);

            // Actualizar las posiciones en el podio
            sortedParticipants.forEach(({ participant, position }) => {
                if (position === 1) {
                    participant.primero += 1;
                    console.log(`${participant.nombre} ahora tiene ${participant.primero} primeros lugares.`);
                } else if (position === 2) {
                    participant.segundo += 1;
                    console.log(`${participant.nombre} ahora tiene ${participant.segundo} segundos lugares.`);
                } else if (position === 3) {
                    participant.tercero += 1;
                    console.log(`${participant.nombre} ahora tiene ${participant.tercero} terceros lugares.`);
                } else {
                    participant.fuera_de_podio += 1;
                    console.log(`${participant.nombre} quedó fuera del podio.`);
                }
            });

            // Mostrar el ganador
            let winner = sortedParticipants[0].participant;
            window.alert(`¡El ganador de la carrera es ${winner.nombre}!`);

            // Limpiar la interfaz
            let containerVehicles = document.getElementById("container-vehicles-circuit");
            if (containerVehicles) {
                containerVehicles.remove();
            }

            let loadCircuit = document.getElementById("load-circuit");
            loadCircuit.style.display = "flex";
        }
    }, 1000);
}

// CHANGE OF PAGE ----------------------------------------------------------------

const body = document.body;
const containerBody = document.getElementById('container-body');
const containerGame = document.getElementById('container-game');
const startButton = document.getElementById('START');
const homeSpan = document.getElementById('HOME');

startButton.addEventListener('click', () => {
    containerBody.style.opacity = '0';
    containerBody.style.display = 'none';
    
    containerGame.style.opacity = '1';
    containerGame.style.display = 'inline';

    // RESETEAMOS LOS ITEMS DEL ARRAY CON TODOS LOS ELEMENTOS NUEVOS CREADOS
    console.info(participants)
    inputs.initDropdown('dropdown-circuits', {
        placeholder: 'Circuito',
        width: '235px',
        items: circuits.map((circuit) => circuit.nombre)
    })
    inputs.initDropdown('dropdown-participants', {
        placeholder: 'Añadir participante',
        width: '235px',
        items: participants.map((participant) => participant.nombre)
    })
    
    
    body.style.backgroundImage = 'url(./F1/Circuit.jpg)';
});

homeSpan.addEventListener('click', () => {
    containerGame.style.opacity = '0';
    containerGame.style.display = 'none';
    
    containerBody.style.opacity = '1';
    containerBody.style.display = 'inline';
    
    body.style.backgroundImage = 'url(./F1/Car-study.jpg)';
});