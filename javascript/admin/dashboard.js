document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    updateDashboardStats();
    renderFleetStatus();
});

// Mock Data
const shuttles = [
    { id: 1, name: 'Shuttle 101', plate: 'ABC-1234', status: 'active', seats: 14, capacity: 20 },
    { id: 2, name: 'Shuttle 102', plate: 'XYZ-9876', status: 'maintenance', seats: 0, capacity: 20 },
    { id: 3, name: 'Shuttle 104', plate: 'SLU-2024', status: 'active', seats: 8, capacity: 20 }
];

const stats = {
    totalUsers: 142,
    routes: 4,
    todayBookings: 89
};

function updateDashboardStats() {
    // Calculate Active Shuttles
    const activeCount = shuttles.filter(s => s.status === 'active').length;
    
    document.getElementById('activeShuttlesCount').textContent = activeCount;
    document.getElementById('totalUsersCount').textContent = stats.totalUsers;
    document.getElementById('routesCount').textContent = stats.routes;
    document.getElementById('bookingsCount').textContent = stats.todayBookings;
}

function renderFleetStatus() {
    const container = document.getElementById('fleetList');
    let html = '';

    shuttles.forEach(shuttle => {
        const isActive = shuttle.status === 'active';
        
        html += `
        <div class="fleet-item">
            <div class="fleet-info">
                <div class="fleet-icon ${isActive ? 'icon-active' : 'icon-muted'}">
                    <i data-lucide="bus" class="icon-md"></i>
                </div>
                <div>
                    <p class="fleet-name">${shuttle.name}</p>
                    <p class="fleet-plate">${shuttle.plate}</p>
                </div>
            </div>
            <div class="fleet-stats">
                <div class="seat-count">
                    <span class="seat-val">${shuttle.seats}/${shuttle.capacity}</span>
                    <span class="seat-lbl">Seats</span>
                </div>
                <span class="${isActive ? 'badge-active' : 'badge-maintenance'}">
                    ${shuttle.status}
                </span>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
    
    // Refresh Icons for inserted HTML
    lucide.createIcons();
}