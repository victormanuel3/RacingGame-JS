export class customInputs {
    constructor() {
        this.dropdowns = []
        this.selects = []
    }
    initInputText(wrapper, options = {}) {
        const wrapper_input_text = document.getElementById(wrapper);
        if(!wrapper_input_text) return console.info(`El elemento ${wrapper} no ha sido encontrado`)
        wrapper_input_text.classList.add("vm-custom-input-text")
        
        if (options.width)
            wrapper_input_text.style.setProperty('--vm-input-text-width', options.width)

        if (options.height)
            wrapper_input_text.style.setProperty('--vm-input-text-height', options.height)

        wrapper_input_text.innerHTML = `
            <input type="text" placeholder="${options.placeholder ?? 'Introduce un texto'}">
        `
        if (options.icon) {
            wrapper_input_text.innerHTML += options.icon
            const icon = wrapper_input_text.lastElementChild;
            if (options.color) {
                icon.style.color = options.color
            }
        }
    }

    initDropdown(wrapper, options = {}) {
        const wrapper_dropdown = document.getElementById(`${wrapper}`)
        if (!wrapper_dropdown) return console.error("El elemento wrapper_dropdown no existe.")
        wrapper_dropdown.classList.add("vm-custom-dropdown")
        
        // console.info(wrapper_dropdown)

        if (options.width)
            wrapper_dropdown.style.setProperty('--vm-dropdown-width', options.width)

        if (options.height)
            wrapper_dropdown.style.setProperty('--vm-dropdown-height', options.height)

        //CREAR INPUT Y DIV LISTA
        wrapper_dropdown.innerHTML = `
        <input type="text" class="dropdown-input" placeholder="${options.placeholder || 'Seleccione una opción'}" autocomplete="off"/>
        <div class="dropdown-list"></div>
        `;
        let input = wrapper_dropdown.querySelector(".dropdown-input")
        let list = wrapper_dropdown.querySelector(".dropdown-list")
        
        const dropdownInstance = {
            wrapper_dropdown,
            input,
            list,
            isOpen: false,
            items: options.items || []
        }
        this.fillDropdown(dropdownInstance)
        this.setupDropdownEvents(dropdownInstance)
    }
    
    initSelect(wrapper, options = {}) {
        const wrapper_select = document.getElementById(wrapper)
        if (!wrapper_select) console.error("El elemento wrapper_select no existe.")
        wrapper_select.classList.add("vm-custom-select")
        
        console.info(wrapper_select)

        if (options.width)
            wrapper_select.style.setProperty('--vm-select-width', options.width)

        if (options.height)
            wrapper_select.style.setProperty('--vm-select-height', options.height)

        wrapper_select.innerHTML = '';

        const button = document.createElement('button');
        button.id = `btn-select-${wrapper}`;
        button.innerHTML = `
            <span id="prueba-${wrapper}" data-placeholder="${options.placeholder || 'Selecciona una opción...'}"></span>
            <span><i class="arrow-select fa-regular fa-angle-down"></i></span>
        `;
    
        const list = document.createElement('div');
        list.classList.add('select-list');
    
        wrapper_select.appendChild(button);
        wrapper_select.appendChild(list);

        if (options.colors)
            wrapper_select.style.setProperty('--vm-select-color', options.colors)

        const selectInstance = {
            wrapper_select,
            button,
            list,
            arrow: button.querySelector('.arrow-select'),
            isOpen: false,
            items: options.items || []
        }
        this.fillSelect(selectInstance)
        this.setupSelectEvents(selectInstance)

        return selectInstance;
    }

    initMultipleSelects(config) {
        Object.entries(config).forEach(([wrapperId, options]) => {
            this.initSelect(wrapperId, options);
        });
    }

    initInputNumber(wrapper, options) {
        const wrapper_input = document.getElementById(wrapper)
        if (!wrapper_input) return console.error(`El elemento ${wrapper} no existe`)
        wrapper_input.classList.add("vm-custom-input-number")
        
        if (options.width)
            wrapper_input.style.setProperty('--vm-input-number-width', options.width)

        if (options.height)
            wrapper_input.style.setProperty('--vm-input-number-height', options.height)

        wrapper_input.innerHTML = `
        <input type="number" min="${options.min ?? 0}" ${options.max ? `max="${options.max}"` : ''} 
            ${options.placeholder ? `placeholder="${options.placeholder}"` : `value="${options.min ?? 0}"`}>
        <div class="buttons">
            <button class="sumar">
                <svg viewBox="0 0 24 24"><path d="M4 16 L12 8 L20 16" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
            <button class="restar">
                <svg viewBox="0 0 24 24"><path d="M4 8 L12 16 L20 8" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
        </div>
        `
        let input = document.querySelector(`#${wrapper} > input`)
        let sumar = document.querySelector(`#${wrapper} > .buttons > .sumar`)
        let restar = document.querySelector(`#${wrapper} > .buttons > .restar`)
        let min = options.min ?? 0;
        let max = options.max ?? null;

        const InputInstance = {
            wrapper_input,
            input,
            sumar,
            min,
            max,
            restar
        }
        this.setupNumberInputEvents(InputInstance)
    }

    fillDropdown(dropdown) {
        dropdown.list.innerHTML = '';
        dropdown.items.forEach((item) => {
            const div = document.createElement("div");

            if (typeof item == 'object' && item != null) {
                div.innerHTML = `
                <span>${item.label}</span>
                <span>${item.type}</span>
                `
            } else {
                div.innerHTML = `
                <span>${item}</span>
                `
            }
            div.classList.add("dropdown-item")
            div.addEventListener("click", () => {
                dropdown.input.value = div.firstElementChild.textContent
                dropdown.input.dispatchEvent(new Event('change', { bubbles: true }))
                this.toggleDropdown(dropdown, false)
            })
            dropdown.list.appendChild(div)
        })
    }

    fillSelect(select) {
        select.list.innerHTML = '';

        select.items.forEach((item) => {
            const div = document.createElement("div");
            if (typeof item == 'object' && item != null) {
                div.innerHTML = `
                <span>${item.label}</span>
                <span>${item.type}</span>
                `
            } else {
                div.innerHTML = `
                <span>${item}</span>
                `
            }
            div.classList.add("select-item")
            div.addEventListener("click", () => {
                select.button.firstElementChild.textContent = div.firstElementChild.textContent
                this.toggleSelect(select, false)
            })
            select.list.appendChild(div)
        })
    }

    toggleDropdown(dropdown, shouldOpen) {
        dropdown.isOpen = typeof shouldOpen == 'boolean' ? shouldOpen : !dropdown.isOpen
        if (dropdown.isOpen && dropdown.input.value) {
            let value_input = dropdown.input.value.toLowerCase();
            dropdown.items = dropdown.items.filter((item) => {
                if (typeof item === 'object' && item != null)
                    return item.label.toLowerCase().includes(value_input) || item.type.toLowerCase().includes(value_input)
                else
                    return item.toLowerCase().includes(value_input)
            })
            this.fillDropdown(dropdown)
        }
        dropdown.list.classList.toggle('active', dropdown.isOpen);
    }

    toggleSelect(select, shouldOpen) {
        console.info("INTENTA ABRIRSE")
        select.isOpen = typeof shouldOpen == 'boolean' ? shouldOpen : !select.isOpen
        select.list.classList.toggle('active', select.isOpen);
        select.arrow.classList.toggle('rotate', select.isOpen)
    }

    setupDropdownEvents(dropdown) {
        let input = dropdown.input;
        let wrapper = dropdown.wrapper_dropdown;
        let items = dropdown.items

        input.addEventListener("click", () => {
            this.toggleDropdown(dropdown, true);
        })
        
        document.addEventListener("click", (e) => {
            if (dropdown.isOpen && !wrapper.contains(e.target)) {
                this.toggleDropdown(dropdown, false);
            }
        })

        input.addEventListener("input",() => {
            let value = input.value.toLowerCase();
            dropdown.items = items.filter((item) => {
                if (typeof item === 'object' && item != null)
                    return item.label.toLowerCase().includes(value) || item.type.toLowerCase().includes(value)
                else
                    return item.toLowerCase().includes(value)
            })
            this.fillDropdown(dropdown)
        })
    }

    setupSelectEvents(select) {
        let button = select.button;
        let wrapper = select.wrapper_select;

        button.addEventListener("click", () => {
            this.toggleSelect(select, true);
        })
        
        document.addEventListener("click", (e) => {
            if (select.isOpen && !wrapper.contains(e.target)) {
                this.toggleSelect(select, false);
            }
        })
    }

    setupNumberInputEvents(instance) {
        let aumentar;
        let disminuir;

        //AUMENTAR
        instance.sumar.addEventListener("click", () => {
            instance.input.value++
        });

        instance.sumar.addEventListener("mousedown", () => {
            aumentar = setTimeout(() => {
                aumentar = setInterval(() => {
                    instance.input.value++
                }, 120);
            }, 200)
        })

        function detenerIncremento() {
            if (aumentar) {
                clearTimeout(aumentar)
                clearInterval(aumentar)
            }
        }

        instance.sumar.addEventListener("mouseup", detenerIncremento)
        window.addEventListener("mouseup", detenerIncremento)
        
        // DISMINUIR
        instance.restar.addEventListener("click", () => {
            if (instance.input.value > instance.min)
                instance.input.value--
        })

        instance.restar.addEventListener("mousedown", () => {
            disminuir = setTimeout(() => {
                disminuir = setInterval(() => {
                    if (instance.input.value > instance.min)
                        instance.input.value--
                }, 120);
            }, 200)
        })

        function detenerDisminuir() {
            if (disminuir) {
                clearTimeout(disminuir)
                clearInterval(disminuir)
            }
        }

        instance.sumar.addEventListener("mouseup", detenerDisminuir)
        window.addEventListener("mouseup", detenerDisminuir)
    }
}

export class Validator {
    constructor(rules) {
        this.rules = rules;
    }

    getElement(field) {
        console.info(field)
        let element = document.getElementById(field)
        if (!element)
            return null
        
        if (this.ifCustomComponent(element)) {
            return element.querySelector("input, button")
        }
    }

    ifCustomComponent(element) {
        const customClass = [
            'vm-custom-dropdown',
            'vm-custom-select',
            'vm-custom-input-number',
            'vm-custom-input-text'
        ]

        return customClass.some((className) => {
            return element.classList.contains(className)
        })
    }

    validateField(field) {
        const element = this.getElement(field)
        console.info(element)
        if (!element) return false
        
        let rules = this.rules[field]
        if (!rules) return true
        
        this.removeError(element)
        
        let value = this.getValue(element)
        console.info(value)
        
        if (rules.required) {
            if (!this.checkRule(value, 'required', true)) {
                this.showError(element, this.getMessageError('required'))
                return false
            }
        }

        const validationOrder = ['minLength', 'maxLength', 'min', 'max'];

        validationOrder.forEach((ruleName) => {
            if (rules[ruleName]) {
                if (!this.checkRule(value, ruleName, rules[ruleName])) {
                    this.showError(element, this.getMessageError(ruleName, rules[ruleName]))
                    return false
                }
            }
        })
        return true
    }

    validateAll() {
        let isValid = true;
        Object.keys(this.rules).forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                isValid = false;
            }
        });
        return isValid;
    }

    getValue(field) {
        if (field.tagName === 'DIV' || field.tagName === 'BUTTON')
            return field.textContent.trim()
        else 
            return field.value.trim()
        
    }

    checkRule(value, ruleName, ruleValue) {
        switch (ruleName) {
            case 'required':
                return value !== ''
    
            case 'minLength':
                return  value === '' || value.length >= ruleValue
                
            case 'maxLength':
                return value === '' || value.length <= ruleValue
            
            case 'min':
                return value === '' || Number(value) >= ruleValue
            
            case 'max':
                return value === '' || Number(value) <= ruleValue 
            
            default:
                return true
        }
    }

    getMessageError(ruleName, ruleValue) {
        const messages = {
            required: 'El campo es obligatorio.',
            minLength: `El número mínimo de caracteres es de  ${ruleValue}.`,
            maxLenght: `El número máximo de caracteres es de  ${ruleValue}.`,
            min: `El valor mínimo es de ${ruleValue}.`,
            max: `El valor máximo es de ${ruleValue}.`,
        }
        return messages[ruleName] || 'Campo inválido.'
    }

    showError(field, message) {
        let error = document.createElement('span')
        field.classList.add('field-invalid-vm')
        field.parentElement.classList.add('has-error');
        error.classList.add('error-validator-vm')
        error.innerText = message;
        field.parentNode.insertBefore(error, field.nextSibling)
    }

    removeError(field) {
        const span_error = field.nextElementSibling;
        if (span_error && span_error.className == 'error-validator-vm') {
            span_error.remove()
        }
        field.classList.remove("field-invalid-vm")
    }
}