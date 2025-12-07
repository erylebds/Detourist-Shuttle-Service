document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    initDateDisplay();
    populateDropdowns();
    renderSchedules();
});

//Mock Data
let schedules = [
    { id: '1', time: '09:30 AM', routeId: 'r1', shuttleId: 's1', driverId: 'd1' },
    { id: '2', time: '11:00 AM', routeId: 'r2', shuttleId: 's1', driverId: 'd1' },
    { id: '3', time: '01:30 PM', routeId: 'r1', shuttleId: 's2', driverId: 'd2' }
];

const mockRoutes = [
    { id: 'r1', name: 'Main Campus ➝ Bakakeng', duration: '45 min' },
    { id: 'r2', name: 'Bakakeng ➝ Main Campus', duration: '45 min' },
    { id: 'r3', name: 'Main Campus ➝ Navy Base', duration: '30 min' }
];

const mockShuttles = [
    { id: 's1', name: 'Shuttle 101' },
    { id: 's2', name: 'Shuttle 104' },
    { id: 's3', name: 'Shuttle 105' }
];

const mockDrivers = [
    { id: 'd1', name: 'Manong Ben' },
    { id: 'd2', name: 'Kuya Driver' }
];

function initDateDisplay() {
    const dateEl = document.getElementById('currentDateDisplay');
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    updateTripCount();
}

function updateTripCount() {
    document.getElementById('tripCountDisplay').textContent = `${schedules.length} scheduled trips`;
}

function populateDropdowns() {
    const routeSel = document.getElementById('routeSelect');
    const shuttleSel = document.getElementById('shuttleSelect');
    const driverSel = document.getElementById('driverSelect');

    mockRoutes.forEach(r => routeSel.innerHTML += `<option value="${r.id}">${r.name}</option>`);
    mockShuttles.forEach(s => shuttleSel.innerHTML += `<option value="${s.id}">${s.name}</option>`);
    mockDrivers.forEach(d => driverSel.innerHTML += `<option value="${d.id}">${d.name}</option>`);
}

function renderSchedules() {
    const container = document.getElementById('scheduleList');
    container.innerHTML = '';

    if (schedules.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        return;
    } else {
        document.getElementById('noResults').style.display = 'none';
    }

    schedules.forEach(sch => {
        const route = mockRoutes.find(r => r.id === sch.routeId);
        const shuttle = mockShuttles.find(s => s.id === sch.shuttleId);
        const driver = mockDrivers.find(d => d.id === sch.driverId);

        const html = `
        <div class="schedule-item">
            <div class="schedule-main">
                <div class="time-box">
                    <p class="time-val">${sch.time.split(' ')[0]}</p>
                    <p class="time-lbl">${sch.time.split(' ')[1]} Departure</p>
                </div>

                <div class="route-info">
                    <p class="route-name">${route.name}</p>
                    <div class="route-details">
                        <span class="detail-item">
                            <i data-lucide="bus" class="icon-xs"></i> ${shuttle.name}
                        </span>
                        <span class="detail-item">
                            <i data-lucide="user" class="icon-xs"></i> ${driver.name}
                        </span>
                        <span class="detail-item">
                            <i data-lucide="clock" class="icon-xs"></i> ${route.duration}
                        </span>
                    </div>
                </div>
            </div>

            <div class="schedule-actions">
                <span class="status-badge">Scheduled</span>
                <div class="dropdown" style="position: relative;">
                     <button class="menu-trigger" onclick="deleteSchedule('${sch.id}')" title="Delete">
                        <i data-lucide="trash-2" class="icon-sm" style="color: #ef4444;"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += html;
    });

    lucide.createIcons();
    updateTripCount();
}

//Modal Logic
function openAddModal() {
    document.getElementById('addScheduleModal').classList.add('active');
}

function closeModal() {
    document.getElementById('addScheduleModal').classList.remove('active');
}

//Add Schedule
function handleAddSchedule(e) {
    e.preventDefault();
    
    //Convert 24h input to 12h format
    const timeInput = e.target.querySelector('input[type="time"]').value; 
    const routeId = document.getElementById('routeSelect').value;
    const shuttleId = document.getElementById('shuttleSelect').value;
    const driverId = document.getElementById('driverSelect').value;

    const newSchedule = {
        id: Date.now().toString(),
        time: formatTime(timeInput),
        routeId,
        shuttleId,
        driverId
    };

    schedules.push(newSchedule);
    
    renderSchedules();
    closeModal();
    e.target.reset();
    
    alert('Schedule created successfully!');
}

function formatTime(timeString) {
    const [hour, minute] = timeString.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minute} ${ampm}`;
}

function deleteSchedule(id) {
    if(confirm('Are you sure you want to remove this schedule?')) {
        schedules = schedules.filter(s => s.id !== id);
        renderSchedules();
    }
}