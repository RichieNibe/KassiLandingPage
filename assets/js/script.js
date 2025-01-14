document.addEventListener('DOMContentLoaded', function () {
    // Function to handle form submission
    function initializeForm(formId, inputId, buttonId, messageId, successId) {
        const form = document.getElementById(formId);
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        const statusMessage = document.getElementById(messageId);
        const successMessage = document.getElementById(successId);

        if (!form) return; // Skip if form doesn't exist

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            button.disabled = true;
            statusMessage.textContent = 'Submitting...';
            const email = input.value;

            try {
                const scriptURL = 'https://script.google.com/macros/s/AKfycbxwO5FsST3LQBVdxsKxv4LDZlGecEn7CHgE06TBz8qpojyyopHDEtP6TNeZOfPmJWgh/exec';
                const timeoutDuration = 5000; // 5 seconds
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                // Show success state
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');

            } catch (error) {
                console.error('Error:', error);

                button.disabled = false;
                statusMessage.textContent = '';

                // Show user-friendly error
                if (error.name === 'AbortError') {
                    alert('Request timed out. Please try again.');
                } else {
                    alert('There was an error submitting your email. Please try again.');
                }
            }
        });
    }

    // Initialize both forms
    initializeForm('waitlistForm', 'emailInput', 'submitButton', 'statusMessage', 'successMessage');
    initializeForm('waitlistForm2', 'emailInput2', 'submitButton2', 'statusMessage2', 'successMessage2');
});