// JavaScript do zwiększania licznika zadowolonych klientów, gdy element jest widoczny
import {config} from "./cfg";

let satisfiedCustomers = 0;
const targetSatisfiedCustomers = 350;

function updateSatisfiedCounter() {
    document.getElementById('satisfiedCounter').innerText = satisfiedCustomers;
    satisfiedCustomers += 1;
    if (satisfiedCustomers <= targetSatisfiedCustomers) {
        requestAnimationFrame(updateSatisfiedCounter);
    } else {
        document.getElementById('satisfiedCounter').innerText = targetSatisfiedCustomers + "+";
    }
}

// Intersection Observer do uruchamiania licznika, gdy pojemnik staje się widoczny
const satisfiedContainer = document.getElementById('satisfiedContainer');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('in viewport');
            updateSatisfiedCounter();
            satisfiedContainer.style.opacity = 1; // Spraw, aby pojemnik był widoczny
            observer.unobserve(entry.target); // Przestań obserwować, gdy licznik zacznie się
        }
    });
}, { threshold: 0.5 }); // Dostosuj próg według potrzeb

// Rozpocznij obserwowanie pojemnika
observer.observe(satisfiedContainer);

// on content laoded

function openTripModal (trip, lang) {
    //console.log({a:this, arguments})
    console.log('opening modal');
    if(trip==='teide' && lang==='en') {
        document.getElementById('modal_teide_en').getElementsByClassName('modal-checkbox')[0].checked = true;
    }
    if(trip==='teide' && lang==='pl') {
        document.getElementById('modal_teide_pl').getElementsByClassName('modal-checkbox')[0].checked = true;
    }
}

console.log({config})
function initModalStuff(btnId, modalId, target, lang) {
    // Initialize Flatpickr for date fields
    document.getElementById(btnId).addEventListener('click', (e) => {
        e.preventDefault();
        openTripModal(target, lang);
    });
    const modal = document.getElementById(modalId);
    const startDate = modal.querySelector(`input[name="startDate"]`)
    const endDate = modal.querySelector(`input[name="endDate"]`)
    console.log({modalId, startDate, endDate})
    flatpickr(startDate, {dateFormat: "Y-m-d"});
    flatpickr(endDate, {dateFormat: "Y-m-d"});

    // Handle form submission
    console.log({modal})
    modal.getElementsByClassName('modal-payment-btn')[0].addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent default form submission
        const form = modal.getElementsByClassName('modalForm')[0];
        const formData = new FormData(form);
        // check if form is valid
        if (!form.checkValidity()) {
            alert('Please fill out all fields');
            return;
        }

        // Convert FormData to an object
        const data = Object.fromEntries(formData.entries());
        //data.startDate = new Date(data.startDate);
        //data.endDate = new Date(data.endDate);
        const apiBase = config.API;

        try {
            let targetUrl =  `${apiBase}/api/teide-add`;
            switch (target) {
                case 'teide':
                    targetUrl = lang==='pl' ? `${apiBase}/api/teide-add`: `${apiBase}/api/teide-eng-add`;
                    break;
                default:
                    throw new Error('Invalid target');
            }
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const resJson = await response.json();
                window.location.href = resJson.url;
                //e.target.reset(); // Reset form after successful submission
            } else {
                // get error message
                const errorRes = await response.json();
                alert('Failed to submit the form: error: ' + errorRes.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    });
}
window.initModalStuff = initModalStuff;