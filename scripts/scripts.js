// JavaScript do zwiększania licznika zadowolonych klientów, gdy element jest widoczny
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
