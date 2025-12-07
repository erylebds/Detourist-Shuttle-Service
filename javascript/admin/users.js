document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    renderUsers();
    updateStats();
});

//Mock Data
const students = [
    { id: 's1', name: 'John Doe', email: 'john.doe@slu.edu.ph', phone: '09123456789', role: 'student' },
    { id: 's2', name: 'Jane Smith', email: 'jane.smith@slu.edu.ph', phone: '09987654321', role: 'student' },
    { id: 's3', name: 'Mark Lee', email: 'mark.lee@slu.edu.ph', phone: '', role: 'student' }
];

const drivers = [
    { id: 'd1', name: 'Manong Ben', email: 'ben.driver@shuttle.com', phone: '09112223333', role: 'driver' },
    { id: 'd2', name: 'Kuya Driver', email: 'kuya@shuttle.com', phone: '09445556666', role: 'driver' }
];

let allUsers = [...students, ...drivers];
let currentTab = 'students';

function renderUsers(filterText = '') {
    const studentsContainer = document.getElementById('studentsContainer');
    const driversContainer = document.getElementById('driversContainer');
    
    //Filter users based on search
    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(filterText.toLowerCase()) || 
        user.email.toLowerCase().includes(filterText.toLowerCase())
    );

    const filteredStudents = filteredUsers.filter(u => u.role === 'student');
    const filteredDrivers = filteredUsers.filter(u => u.role === 'driver');

    //Students
    studentsContainer.innerHTML = filteredStudents.map(user => createUserRow(user)).join('');
    
    //Drivers
    driversContainer.innerHTML = filteredDrivers.map(user => createUserRow(user)).join('');

    //Empty State Logic
    const emptyState = document.getElementById('noResults');
    if (currentTab === 'students' && filteredStudents.length === 0) emptyState.style.display = 'block';
    else if (currentTab === 'drivers' && filteredDrivers.length === 0) emptyState.style.display = 'block';
    else emptyState.style.display = 'none';

    lucide.createIcons();
}

function createUserRow(user) {
    const avatarClass = user.role === 'student' ? 'avatar-student' : 'avatar-driver';
    const initials = user.name.split(' ').map(n => n[0]).join('');

    return `
    <div class="user-item">
        <div class="user-main">
            <div class="user-avatar ${avatarClass}">
                ${initials}
            </div>
            <div class="user-details">
                <p class="user-name">${user.name}</p>
                <p class="user-email">${user.email}</p>
            </div>
        </div>
        <div class="user-actions">
            ${user.phone ? `
            <div class="user-contact">
                <i data-lucide="phone" class="icon-xs"></i> ${user.phone}
            </div>` : ''}
            
            <button class="btn-icon-ghost" onclick="deleteUser('${user.id}')" title="Remove User">
                <i data-lucide="trash-2" class="icon-sm" style="color: #ef4444;"></i>
            </button>
        </div>
    </div>
    `;
}

function updateStats() {
    const sCount = allUsers.filter(u => u.role === 'student').length;
    const dCount = allUsers.filter(u => u.role === 'driver').length;

    document.getElementById('studentCount').textContent = sCount;
    document.getElementById('driverCount').textContent = dCount;
    
    //Update Badge Counts in Tabs
    document.getElementById('tabStudentCount').textContent = sCount;
    document.getElementById('tabDriverCount').textContent = dCount;
}

//Search Filter
function filterUsers() {
    const text = document.getElementById('userSearch').value;
    renderUsers(text);
}

//Tab Switching
function switchTab(tab) {
    currentTab = tab;
    
    //Toggle Button Active State
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`).classList.add('active');

    //Toggle Content Visibility
    document.querySelectorAll('.user-list').forEach(list => list.classList.remove('active'));
    document.getElementById(`${tab}List`).classList.add('active');

    //Re-run filter to show correct empty state
    filterUsers();
}

function deleteUser(id) {
    if(confirm('Are you sure you want to remove this user?')) {
        allUsers = allUsers.filter(u => u.id !== id);
        renderUsers();
        updateStats();
    }
}