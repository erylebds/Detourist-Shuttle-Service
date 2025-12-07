document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    renderRoutes();
    updateStats();
});

//Mock Data
let routes = [
    {
        id: '1',
        name: 'Main Campus ➝ Bakakeng',
        estimatedDuration: 45,
        startLocation: { address: 'Main Campus Gate 2' },
        endLocation: { address: 'Bakakeng Campus' },
        stops: [
            { id: 's1', address: 'SM City Baguio' },
            { id: 's2', address: 'Convention Center' },
            { id: 's3', address: 'Marcos Highway' }
        ]
    },
    {
        id: '2',
        name: 'Bakakeng ➝ Main Campus',
        estimatedDuration: 45,
        startLocation: { address: 'Bakakeng Campus' },
        endLocation: { address: 'Main Campus Gate 2' },
        stops: [
            { id: 's4', address: 'Marcos Highway' },
            { id: 's5', address: 'Convention Center' },
            { id: 's6', address: 'Session Road' }
        ]
    },
    {
        id: '3',
        name: 'Main Campus ➝ Navy Base',
        estimatedDuration: 30,
        startLocation: { address: 'Main Campus Gate 2' },
        endLocation: { address: 'Navy Base' },
        stops: [
            { id: 's7', address: 'Leonard Wood Road' },
            { id: 's8', address: 'Botanical Garden' }
        ]
    }
];

function renderRoutes(filterText = '') {
    const container = document.getElementById('routeGrid');
    container.innerHTML = '';

    const filtered = routes.filter(r => r.name.toLowerCase().includes(filterText.toLowerCase()));

    if (filtered.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        return;
    } else {
        document.getElementById('noResults').style.display = 'none';
    }

    filtered.forEach(route => {
        let stopsHtml = '';
        route.stops.forEach(stop => {
            stopsHtml += `
            <div class="path-node">
                <div class="path-line"></div>
                <div class="node-dot dot-stop"></div>
                <div class="node-info">
                    <p class="node-name">${stop.address}</p>
                    <p class="node-type">Stop</p>
                </div>
            </div>`;
        });

        const html = `
        <article class="route-card">
            <div class="card-header">
                <div class="route-info">
                    <h3>${route.name}</h3>
                    <div class="route-badges">
                        <span class="badge-outline">
                            <i data-lucide="clock" class="icon-xs mr-1"></i> ${route.estimatedDuration} min
                        </span>
                        <span class="badge-outline">
                            ${route.stops.length + 2} stops
                        </span>
                    </div>
                </div>
                <button class="menu-trigger" onclick="deleteRoute('${route.name}')" title="Delete Route">
                    <i data-lucide="trash-2" class="icon-sm text-destructive" style="color:#ef4444;"></i>
                </button>
            </div>
            
            <div class="card-body">
                <div class="route-path">
                    
                    <!-- Start -->
                    <div class="path-node">
                        <div class="path-line"></div>
                        <div class="node-dot dot-start"></div>
                        <div class="node-info">
                            <p class="node-name">${route.startLocation.address}</p>
                            <p class="node-type">Start</p>
                        </div>
                    </div>

                    <!-- Stops -->
                    ${stopsHtml}

                    <!-- End -->
                    <div class="path-node">
                        <div class="node-dot dot-end"></div>
                        <div class="node-info">
                            <p class="node-name">${route.endLocation.address}</p>
                            <p class="node-type">End</p>
                        </div>
                    </div>

                </div>
            </div>
        </article>
        `;
        container.innerHTML += html;
    });

    lucide.createIcons();
}

function updateStats() {
    const totalStops = routes.reduce((acc, r) => acc + r.stops.length + 2, 0);
    const avgDur = Math.round(routes.reduce((acc, r) => acc + r.estimatedDuration, 0) / routes.length) || 0;

    document.getElementById('totalRoutes').textContent = routes.length;
    document.getElementById('avgDuration').textContent = avgDur;
    document.getElementById('totalStops').textContent = totalStops;
}

//Search Filter
function filterRoutes() {
    const text = document.getElementById('routeSearch').value;
    renderRoutes(text);
}

//Modal Logic
function openAddModal() {
    document.getElementById('addRouteModal').classList.add('active');
}

function closeModal() {
    document.getElementById('addRouteModal').classList.remove('active');
}

//Add Route
function handleAddRoute(e) {
    e.preventDefault();
    const inputs = e.target.getElementsByTagName('input');
    
    //Mock
    const newRoute = {
        id: Date.now().toString(),
        name: inputs[0].value,
        estimatedDuration: parseInt(inputs[1].value),
        startLocation: { address: inputs[3].value },
        endLocation: { address: inputs[4].value },
        stops: [] //Empty stops
    };

    routes.push(newRoute);
    
    renderRoutes();
    updateStats();
    closeModal();
    e.target.reset();
    
    alert('Route added successfully!');
}

function deleteRoute(name) {
    if(confirm(`Are you sure you want to delete ${name}?`)) {
        routes = routes.filter(r => r.name !== name);
        renderRoutes();
        updateStats();
    }
}