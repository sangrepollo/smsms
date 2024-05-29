document.addEventListener('DOMContentLoaded', function() {
    const numeroInput = document.getElementById('numero');
    const mensajeInput = document.getElementById('mensaje');
    const charCount = document.getElementById('charCount');
    const smsForm = document.getElementById('smsForm');
    const resultado = document.getElementById('resultado');
    const successNotification = document.getElementById('successNotification');
    const okButton = document.getElementById('okButton');
    const submitButton = smsForm.querySelector('button[type="submit"]');

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
            resultado.innerText = 'SMS enviado con éxito';
            submitButton.classList.add('success');
            successNotification.classList.remove('hidden');
            smsForm.reset();
            numeroInput.value = "53"; // Reset phone number with prefix
            charCount.innerText = '140 caracteres restantes';
        })
        .catch(error => {
            resultado.innerText = 'Error al enviar SMS: ' + error.message;
        });
    });

    // Handle OK button click
    okButton.addEventListener('click', function() {
        successNotification.classList.add('hidden');
        submitButton.classList.remove('success');
        resultado.innerText = '';
    });
});
