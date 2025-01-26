export function showErrorAlert(message) {
    let alert_modal = document.getElementById("alert-modal")
    let title = document.querySelector("#alert > div.contain-alert h3");
    let alert_message = document.querySelector("#alert > div.contain-alert p");
    let icon = document.querySelector("#alert > div.contain-alert i");

    alert_message.innerHTML = message
    icon.className = 'fa-sharp fa-regular fa-circle-exclamation'
    icon.style.color = 'red'
    title.innerText = 'Error.'
    alert_modal.style.display = 'flex';

    return false
}

export function showSuccessAlert(message) {
    let alert_modal = document.getElementById("alert-modal")
    let title = document.querySelector("#alert > div.contain-alert h3");
    let alert_message = document.querySelector("#alert > div.contain-alert p");
    let icon = document.querySelector("#alert > div.contain-alert i");
    
    alert_message.innerText = message
    icon.className = 'fa-sharp fa-regular fa-circle-check'
    icon.style.color = '#68C027'
    title.innerText = 'Operación realizada.'
    alert_modal.style.display = 'flex';

    return true;
}

export function initCloseModal() {
    let closeButton = document.getElementById("close-alert");
    closeButton.addEventListener("click", () => {
        let alert_modal = document.getElementById("alert-modal")
        alert_modal.style.display = 'none'
    });
}