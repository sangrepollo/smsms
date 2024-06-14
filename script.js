import { contieneMalasPalabras } from './filtro.js';

document.addEventListener('DOMContentLoaded', function() {
    const numeroInput = document.getElementById('numero');
    const mensajeInput = document.getElementById('mensaje');
    const charCount = document.getElementById('charCount');
    const smsForm = document.getElementById('smsForm');
    const resultado = document.getElementById('resultado');
    const notification = document.getElementById('notification');
    const notificationClose = document.getElementById('notification-close');
    const sendButton = document.getElementById('sendButton');
    const countdown = document.getElementById('countdown');

    let isCountingDown = false;
    let countdownInterval;

    // Pre-fill the phone number input with "53"
    numeroInput.value = "53";

    // Restrict input to digits only
    numeroInput.addEventListener('input', function() {
        let value = numeroInput.value;
        value = value.replace(/[^0-9]/g, ''); // Remove non-digit characters
        if (value.length > 10) { // Limit to 10 characters
            value = value.slice(0, 10);
        }
        numeroInput.value = value;
    });

    // Update character count for the message
    mensajeInput.addEventListener('input', function() {
        const maxLength = 140;
        const currentLength = mensajeInput.value.length;
        const remainingChars = maxLength - currentLength;
        charCount.innerText = remainingChars + ' caracteres restantes';
    });

    // Handle form submission
    smsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (isCountingDown) return;

        const numero = numeroInput.value;
        const mensaje = mensajeInput.value;

        // Check for bad words
        if (contieneMalasPalabras(mensaje)) {
            resultado.innerText = 'Error: El mensaje contiene palabras inapropiadas.';
            return;
        }

        fetch('https://zdsms.cu/api/v1/message/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 247|HD8IkiGD1EwGr8XG7uhmIUGFJ9QDYUAO9t2qnffF641fb5b9'
            },
            body: JSON.stringify({ recipient: numero, mstext: mensaje })
        })
        .then(response => response.json())
        .then(data => {
            notification.style.display = 'flex';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000); // Auto-hide after 3 seconds

            smsForm.reset();
            numeroInput.value = "53"; // Reset phone number with prefix
            charCount.innerText = '140 caracteres restantes';

            startCountdown(30); // Start the countdown
        })
        .catch(error => {
            resultado.innerText = 'Error al enviar SMS: ' + error.message;
        });
    });

    // Handle notification close button
    notificationClose.addEventListener('click', function() {
        notification.style.display = 'none';
        location.reload(); // Reload the page to reset the form
    });

    function startCountdown(seconds) {
        isCountingDown = true;
        countdown.innerText = `Espera ${seconds} segundos para enviar otro SMS.`;
        sendButton.disabled = true;

        countdownInterval = setInterval(() => {
            seconds--;
            countdown.innerText = `Espera ${seconds} segundos para enviar otro SMS.`;

            if (seconds <= 0) {
                clearInterval(countdownInterval);
                countdown.innerText = '';
                sendButton.disabled = false;
                isCountingDown = false;
            }
        }, 1000);
    }
});
