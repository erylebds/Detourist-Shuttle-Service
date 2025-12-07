document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    displayDate();
    renderSchedule();
});


//Mock schedule data
const schedules = [
    {
        id: '1',
        time: '09:30',
        ampm: 'AM',
        route: 'Main Campus ➝ Bakakeng',
        shuttle: 'Shuttle 101',
        duration: '45 min',
        start: 'Main Campus Gate 2',
        end: 'Bakakeng Campus',
        status: 'next' //Marks the upcoming trip
    },
    {
        id: '2',
        time: '11:00',
        ampm: 'AM',
        route: 'Bakakeng ➝ Main Campus',
        shuttle: 'Shuttle 101',
        duration: '45 min',
        start: 'Bakakeng Campus',
        end: 'Main Campus Gate 2',
        status: 'scheduled'
    },
    {
        id: '3',
        time: '01:30',
        ampm: 'PM',
        route: 'Main Campus ➝ Navy Base',
        shuttle: 'Shuttle 104',
        duration: '30 min',
        start: 'Main Campus Gate 2',
        end: 'Navy Base',
        status: 'scheduled'
    },
    {
        id: '4',
        time: '03:00',
        ampm: 'PM',
        route: 'Navy Base ➝ Main Campus',
        shuttle: 'Shuttle 104',
        duration: '30 min',
        start: 'Navy Base',
        end: 'Main Campus Gate 2',
        status: 'scheduled'
    }
];


//Displays the current date at the top of the page
function displayDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    const today = new Date().toLocaleDateString('en-US', options);

    dateElement.textContent = today;
}

function renderSchedule() {
    const container = document.getElementById('scheduleTimeline');
    const totalElement = document.getElementById('totalTrips');
    const nextElement = document.getElementById('nextTripTime');

    //Update summary numbers
    totalElement.textContent = schedules.length; //Total number of trips
    nextElement.textContent = schedules[0]?.time + ' ' + //Time of the next trip (first item)
                              schedules[0]?.ampm;

    let html = '';


    //Loop through every trip in the schedule list
    schedules.forEach((trip) => {
        const isNext = trip.status === 'next'; //Check if this is the upcoming trip

        //Build each schedule card HTML
        html += `
        <div class="timeline-row">
            <div class="timeline-connector"></div>
            
            <article class="schedule-card ${isNext ? 'next' : ''}">
                
                <!-- Left time badge -->
                <div class="time-badge">
                    <div class="time-circle">
                        ${trip.time.split(':')[0]} <!-- Hour -->
                    </div>
                    <span class="time-ampm">${trip.time.split(':')[1]} ${trip.ampm}</span>
                </div>

                <!-- Trip details -->
                <div class="trip-details">
                    
                    <!-- Route + status -->
                    <div class="trip-header">
                        <h3 class="trip-route">${trip.route}</h3>
                        <span class="status-badge">${isNext ? 'Next Trip' : 'Scheduled'}</span>
                    </div>

                    <!-- Shuttle info + duration -->
                    <div class="trip-meta">
                        <span class="badge-outline">
                            <i data-lucide="bus" class="icon-xs"></i> ${trip.shuttle}
                        </span>
                        <span class="badge-outline">
                            <i data-lucide="clock" class="icon-xs"></i> ${trip.duration}
                        </span>
                    </div>

                    <!-- Starting point ➝ Ending point -->
                    <div class="trip-path">
                        <div class="path-point">
                            <div class="dot-start"></div>
                            <span>${trip.start}</span>
                        </div>
                        <i data-lucide="arrow-right" class="icon-xs path-arrow"></i>
                        <div class="path-point">
                            <div class="dot-end"></div>
                            <span>${trip.end}</span>
                        </div>
                    </div>

                    <!-- Buttons only appear for the next/upcoming trip -->
                    ${isNext ? `
                    <div class="trip-footer">
                        <button class="btn-sm btn-start">Start Trip</button>
                        <button class="btn-sm btn-view">View Passengers</button>
                    </div>
                    ` : ''}
                </div>

            </article>
        </div>
        `;
    });

    //Insert generated HTML into the page
    container.innerHTML = html;

    //Re-run Lucide to activate icons inside the newly added HTML
    lucide.createIcons();
}