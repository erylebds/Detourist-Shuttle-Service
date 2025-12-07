document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    updateStats();
});

// Search Filter Logic
function filterPassengers() {
    const input = document.getElementById('passengerSearch');
    const filter = input.value.toLowerCase();
    const list = document.getElementById('passengerListContainer');
    const items = list.getElementsByClassName('passenger-row');
    let hasResults = false;

    // Update Text in Empty State
    document.getElementById('searchText').textContent = input.value;

    for (let i = 0; i < items.length; i++) {
        const name = items[i].getAttribute('data-name').toLowerCase();
        if (name.includes(filter)) {
            items[i].style.display = "";
            hasResults = true;
        } else {
            items[i].style.display = "none";
        }
    }

    // Toggle Empty State
    const emptyState = document.getElementById('noResults');
    if (hasResults) {
        emptyState.style.display = "none";
    } else {
        emptyState.style.display = "flex";
    }
}

// Confirm Boarding Logic
function confirmBoarding(btn) {
    const row = btn.closest('.passenger-row');
    
    btn.textContent = "Boarded";
    btn.disabled = true;
    btn.style.opacity = "0.7";
    
    row.classList.add('boarded');
    row.setAttribute('data-status', 'boarded');

    const badgeContainer = row.querySelector('.badge-secondary, .badge-warning');
    if(badgeContainer) {
        badgeContainer.className = 'badge badge-success';
        badgeContainer.innerHTML = `<i data-lucide="check-circle" class="icon-xs mr-1"></i> Boarded`;
        lucide.createIcons(); // Refresh icon
    }

    //Remove Confirm Button after delay
    setTimeout(() => {
        btn.style.display = 'none';
    }, 1000);

    //Update Top Stats
    updateStats();
    
    alert("Passenger confirmed onboard!");
}

function updateStats() {
    const rows = document.querySelectorAll('.passenger-row');
    let boarded = 0;
    let waiting = 0;

    rows.forEach(row => {
        if (row.getAttribute('data-status') === 'boarded') {
            boarded++;
        } else {
            waiting++;
        }
    });

    document.getElementById('totalCount').textContent = rows.length;
    document.getElementById('boardedCount').textContent = boarded;
    document.getElementById('waitingCount').textContent = waiting;
}

function contactPassenger(name) {
    alert(`Opening dialer for ${name}...`);
}

function messageAll() {
    const msg = prompt("Message to all passengers:");
    if(msg) alert("Message sent to all filtered passengers.");
}