document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    renderShuttles();
    updateStats();
});

//Mock Data
let shuttles = [
    { id: '1', name: 'Shuttle 101', plateNumber: 'ABC-1234', status: 'active', availableSeats: 14, capacity: 20, currentLocation: { address: 'Main Campus Gate 2' } },
    { id: '2', name: 'Shuttle 102', plateNumber: 'XYZ-9876', status: 'maintenance', availableSeats: 0, capacity: 20, currentLocation: null },
    { id: '3', name: 'Shuttle 103', plateNumber: 'LMN-4567', status: 'inactive', availableSeats: 20, capacity: 20, currentLocation: null },
    { id: '4', name: 'Shuttle 104', plateNumber: 'SLU-2024', status: 'active', availableSeats: 8, capacity: 20, currentLocation: { address: 'Bakakeng Campus' } }
];

function renderShuttles(filterText = '') {
    const container = document.getElementById('shuttleList');
    container.innerHTML = '';

    const filtered = shuttles.filter(s => 
        s.name.toLowerCase().includes(filterText.toLowerCase()) || 
        s.plateNumber.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        return;
    } else {
        document.getElementById('noResults').style.display = 'none';
    }

    filtered.forEach(shuttle => {
        const iconClass = shuttle.status === 'active' ? 'icon-active' : shuttle.status === 'maintenance' ? 'icon-maintenance' : 'icon-inactive';
        const badgeClass = shuttle.status === 'active' ? 'status-active' : shuttle.status === 'maintenance' ? 'status-maintenance' : 'status-inactive';

        const html = `
        <div class="shuttle-item">
            <div class="shuttle-main">
                <div class="shuttle-icon ${iconClass}">
                    <i data-lucide="bus" class="icon-md"></i>
                </div>
                <div class="shuttle-details">
                    <p class="shuttle-name">${shuttle.name}</p>
                    <p class="shuttle-plate">${shuttle.plateNumber}</p>
                    ${shuttle.currentLocation ? `
                    <div class="shuttle-location">
                        <i data-lucide="map-pin" class="icon-xs"></i>
                        ${shuttle.currentLocation.address}
                    </div>` : ''}
                </div>
            </div>
            
            <div class="shuttle-meta">
                <div class="meta-stats">
                    <div class="flex items-center gap-1 justify-end">
                        <i data-lucide="users" class="icon-xs text-muted-foreground"></i>
                        <span class="meta-val">${shuttle.availableSeats}/${shuttle.capacity}</span>
                    </div>
                    <p class="meta-lbl">Seats Avail.</p>
                </div>
                
                <span class="status-badge ${badgeClass}">
                    ${shuttle.status}
                </span>

                <div class="dropdown" style="position: relative;">
                     <button class="menu-trigger" onclick="deleteShuttle('${shuttle.id}')" title="Delete">
                        <i data-lucide="trash-2" class="icon-sm" style="color: #ef4444;"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += html;
    });

    lucide.createIcons();
}

function updateStats() {
    document.getElementById('totalShuttles').textContent = shuttles.length;
    document.getElementById('activeShuttles').textContent = shuttles.filter(s => s.status === 'active').length;
    document.getElementById('inactiveShuttles').textContent = shuttles.filter(s => s.status === 'inactive').length;
    document.getElementById('maintenanceShuttles').textContent = shuttles.filter(s => s.status === 'maintenance').length;
}

//Search Filter
function filterShuttles() {
    const text = document.getElementById('shuttleSearch').value;
    renderShuttles(text);
}

//Modal Logic
function openAddModal() {
    document.getElementById('addShuttleModal').classList.add('active');
}

function closeModal() {
    document.getElementById('addShuttleModal').classList.remove('active');
}

//Add Shuttle
function handleAddShuttle(e) {
    e.preventDefault();
    const inputs = e.target.getElementsByTagName('input');
    const select = e.target.getElementsByTagName('select')[0];
    
    const newShuttle = {
        id: Date.now().toString(),
        name: inputs[0].value,
        plateNumber: inputs[1].value,
        capacity: parseInt(inputs[2].value),
        availableSeats: parseInt(inputs[2].value),
        status: select.value,
        currentLocation: null
    };

    shuttles.push(newShuttle);
    
    renderShuttles();
    updateStats();
    closeModal();
    e.target.reset();
    
    alert('Shuttle added successfully!');
}

function deleteShuttle(id) {
    if(confirm('Are you sure you want to remove this shuttle?')) {
        shuttles = shuttles.filter(s => s.id !== id);
        renderShuttles();
        updateStats();
    }
}