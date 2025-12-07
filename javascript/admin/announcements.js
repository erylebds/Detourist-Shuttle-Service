document.addEventListener("DOMContentLoaded", function () {
    renderAnnouncements(); //Load and display all announcements
    updateStats();         //Update dashboard counts
    lucide.createIcons();
});


//MOCK DATA FOR THE ANNOUCNEMNTS SECTION FOR ADMIN
let announcements = [
    {
        id: '1',
        title: 'Shuttle Schedule Update',
        message: 'Starting next week, the 7:00 AM shuttle from Main Campus will depart at 6:45 AM to avoid heavy traffic.',
        targetAudience: 'all',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Student ID Requirement',
        message: 'Please ensure you have your SLU ID ready before boarding. Drivers will strictly check IDs starting Monday.',
        targetAudience: 'students',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: '3',
        title: 'Maintenance Schedule',
        message: 'Shuttle 104 will be undergoing maintenance this weekend. Please follow the temporary route assignments.',
        targetAudience: 'drivers',
        createdAt: new Date(Date.now() - 172800000).toISOString()
    }
];

const audienceConfig = {
    all: { label: 'Everyone', icon: 'users', class: 'badge-all' },
    students: { label: 'Students', icon: 'users', class: 'badge-students' },
    drivers: { label: 'Drivers', icon: 'bus', class: 'badge-drivers' },
};

function renderAnnouncements() {
    const container = document.getElementById('announcementList');
    container.innerHTML = ''; //Clear old content before re-rendering

    announcements.forEach(ann => {
        const config = audienceConfig[ann.targetAudience];

        //Format date into a readable format
        const date = new Date(ann.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const html = `
            <article class="announcement-item">
                <div class="ann-content">

                    <!-- Title + Audience Badge -->
                    <div class="ann-header">
                        <h4 class="ann-title">${ann.title}</h4>

                        <span class="badge ${config.class}">
                            <i data-lucide="${config.icon}" style="width:12px; height:12px; margin-right:4px;"></i>
                            ${config.label}
                        </span>
                    </div>

                    <!-- Announcement Message -->
                    <p class="ann-message">${ann.message}</p>

                    <!-- Posting Date -->
                    <p class="ann-date">Posted ${date}</p>
                </div>

                <!-- Delete Button -->
                <div class="ann-actions">
                    <button class="btn-icon-ghost" onclick="deleteAnnouncement('${ann.id}')" title="Delete">
                        <i data-lucide="trash-2" class="icon-sm text-destructive" style="color: #ef4444;"></i>
                    </button>
                </div>
            </article>
        `;

        //Add announcement card to the container
        container.innerHTML += html;
    });

    lucide.createIcons();

    //Update counters after rendering
    updateStats();
}

function updateStats() {
    document.getElementById('totalCount').textContent = announcements.length;

    //Count announcements for students
    document.getElementById('studentCount').textContent =
        announcements.filter(a => a.targetAudience === 'students').length;

    //Count announcements for drivers
    document.getElementById('driverCount').textContent =
        announcements.filter(a => a.targetAudience === 'drivers').length;
}

//Show the modal
function openModal() {
    document.getElementById('announcementModal').classList.add('active');
}

//Hide the modal and reset the form
function closeModal() {
    document.getElementById('announcementModal').classList.remove('active');
    document.getElementById('announcementForm').reset();
}


//Will be changed when database and server is done
function handleCreate(e) {
    e.preventDefault(); //Stop page reload

    //Get values from the input fields
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;
    const audience = document.getElementById('audience').value;

    //Create announcement object
    const newAnn = {
        id: Date.now().toString(), //Unique ID using timestamp
        title: title,
        message: message,
        targetAudience: audience,
        createdAt: new Date().toISOString()
    };

    //Insert at the top of the list (most recent first)
    announcements.unshift(newAnn);

    //Refresh UI
    renderAnnouncements();
    closeModal();

    //Temporary alert (replace with toast later)
    alert('Announcement Sent Successfully!');
}


//Delete announcement by id
function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {

        //Filter out the announcement to remove it
        announcements = announcements.filter(a => a.id !== id);

        //Re-render updated list
        renderAnnouncements();
    }
}