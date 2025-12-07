//Will be changed when there is already a database and server
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-item");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");

            if (target) {
                window.location.href = target; // go to the page
            }
        });
    });
});