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

    let countdownInterval;
    let countdownTime = localStorage.getItem('countdownTime');

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
                'Authorization': 'Bearer 181|nZ4kpTSbVWFFYskMu6r4pFir3mW60JcQwcBDywQF19fbf5bc'
            },
            body: JSON.stringify({ recipient: numero, mstext: mensaje })
        })
        .then(response => response.json())
        .then(data => {
            resultado.innerText = '';
            notification.style.display = 'block';

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
        resultado.innerText = 'SMS enviado con éxito';
    });

    // Initialize countdown if there's remaining time in localStorage
    if (countdownTime) {
        const remainingTime = Math.max(0, countdownTime - Date.now());
        if (remainingTime > 0) {
            startCountdown(Math.ceil(remainingTime / 1000));
        } else {
            localStorage.removeItem('countdownTime');
        }
    }

    function startCountdown(seconds) {
        sendButton.disabled = true;
        countdown.innerText = `Espera ${seconds} segundos para enviar otro SMS.`;

        const endTime = Date.now() + seconds * 1000;
        localStorage.setItem('countdownTime', endTime);

        countdownInterval = setInterval(() => {
            const remainingSeconds = Math.ceil((endTime - Date.now()) / 1000);
            if (remainingSeconds > 0) {
                countdown.innerText = `Espera ${remainingSeconds} segundos para enviar otro SMS.`;
            } else {
                clearInterval(countdownInterval);
                countdown.innerText = '';
                sendButton.disabled = false;
                localStorage.removeItem('countdownTime');
            }
        }, 1000);
    }
});
