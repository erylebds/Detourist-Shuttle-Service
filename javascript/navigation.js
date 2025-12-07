//Will be changed when there is already a database and server
//used to navigate through tabs in the dashboard of each role
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-item");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");

            if (target) {
                window.location.href = target; //go to the page
            }
        });
    });
});