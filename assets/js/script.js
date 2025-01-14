document.addEventListener('DOMContentLoaded', function () {
    const waitlistForm = document.getElementById('waitlistForm');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');
    const statusMessage = document.getElementById('statusMessage');



    waitlistForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        submitButton.disabled = true;
        statusMessage.textContent = 'Submitting...';
        const email = emailInput.value;

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

            // Show success state immediately
            waitlistForm.classList.add('hidden');
            successMessage.classList.remove('hidden');



        } catch (error) {
            console.error('Error:', error);

            submitButton.disabled = false;
            submitButton.textContent = 'Waitlist';

            // Show user-friendly error
            if (error.name === 'AbortError') {
                alert('Request timed out. Please try again.');
            } else {
                alert('There was an error submitting your email. Please try again.');
            }
        }
    });
});