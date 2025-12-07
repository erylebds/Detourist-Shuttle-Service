//THIS JAVASCRIPT CHANGES THE ROLE IN THE LOGIN HTML LABELS WHETHER ITS A STUDENT, DRIVER, OR ADMIN
// Initialize Icons when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    initAuthPage();
});

// Role Configuration Data
const roleConfig = {
    student: {
        title: 'Student Portal',
        description: 'Access shuttle bookings and tracking',
        gradientClass: 'bg-gradient-student'
    },
    driver: {
        title: 'Driver Portal',
        description: 'Manage your schedules and passengers',
        gradientClass: 'bg-gradient-driver'
    },
    admin: {
        title: 'Admin Portal',
        description: 'System administration and management',
        gradientClass: 'bg-gradient-admin'
    }
};

function initAuthPage() {
    //Get Role from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role') || 'student';
    
    //Validate role, default to student if invalid
    const role = roleConfig[roleParam] ? roleParam : 'student';
    const config = roleConfig[role];

    //Update Text Content
    const titleElements = document.querySelectorAll('#portalTitle, #formTitle');
    const descElements = document.querySelectorAll('#portalDesc, #formDesc');
    
    titleElements.forEach(el => el.textContent = config.title);
    descElements.forEach(el => el.textContent = config.description);

    //Update Gradients (Left Panel)
    const leftPanel = document.getElementById('authLeft');
    if (leftPanel) {
        // Remove existing gradient classes
        leftPanel.classList.remove('bg-gradient-student', 'bg-gradient-driver', 'bg-gradient-admin');
        // Add new gradient class
        leftPanel.classList.add(config.gradientClass);
    }

    //Disable Sign Up for non-students
    const signupTabBtn = document.getElementById('signupTabBtn');
    if (signupTabBtn && role !== 'student') {
        signupTabBtn.style.display = 'none';
        document.querySelector('.tabs-list').style.gridTemplateColumns = '1fr'; //Full width login tab
    }
}

//Switch Tabs sign up and login
window.switchTab = function(tabName) {
    //Reset Triggers
    document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active'));
    
    //Hide all forms
    document.querySelectorAll('.form-content').forEach(form => form.classList.remove('active'));

    //Activate selected
    const trigger = document.querySelector(`.tab-trigger[onclick="switchTab('${tabName}')"]`);
    const form = document.getElementById(`${tabName}Form`);
    
    if (trigger) trigger.classList.add('active');
    if (form) form.classList.add('active');
};

//Toggle Password Visibility
window.togglePassword = function(inputId) {
    const input = document.getElementById(inputId);
    
    if (input.type === 'password') {
        input.type = 'text';
        input.parentElement.querySelector('.password-toggle').style.opacity = '0.6';
    } else {
        input.type = 'password';
        input.parentElement.querySelector('.password-toggle').style.opacity = '1';
    }
};

//Quick Access will be removed after database is made
window.setDemo = function(role) {
    window.location.href = `login.html?role=${role}`;
};

//Will be changed once the database is made
window.handleLogin = function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Logging in as ${email}... (Redirecting to Dashboard)`);
    
    //Mock Redirect
    window.location.href = '/html/student/studentBooking.html';
};

//WIll be changed when database is made
window.handleSignup = function(e) {
    e.preventDefault();
    
    const pass = document.getElementById('signup-pass').value;
    const confirmPass = document.getElementById('signup-confirm-pass').value;

    if (pass !== confirmPass) {
        alert("Passwords do not match! Please try again.");
        return;
    }

    //Simulate signup delay
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Creating account...";
    btn.disabled = true;

    setTimeout(() => {
        alert('Account created successfully! Please log in.');
        switchTab('login'); //Switch back to login tab
        btn.textContent = originalText;
        btn.disabled = false;
        e.target.reset(); //Clear form
    }, 1000);
};