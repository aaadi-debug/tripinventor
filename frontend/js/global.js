// ------------------ Scrolled navbar js ----------------------
// console.log("Script loaded");
document.addEventListener("DOMContentLoaded", function () {
    const navbarBelowWrapper = document.querySelector(".navbar_below_wrapper");

    window.addEventListener("scroll", function () {
        // console.log("Scroll event triggered:", window.scrollY); // Debugging
        if (window.scrollY > 50) { // Adjust the scroll threshold as needed
            navbarBelowWrapper.classList.add("scrolled");
        } else {
            navbarBelowWrapper.classList.remove("scrolled");
        }
    });




    // Sidebar functionality
    const openSidebarBtn = document.getElementById('open-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            console.log("clicked");
            
            const content = header.nextElementSibling;
            if (!content) return; // Ensure content exists

            const isOpen = content.classList.contains('open');
            console.log("clicked", content, content.scrollHeight);


            // Close all open accordions
            document.querySelectorAll('.accordion-content.open').forEach(openContent => {
                openContent.classList.remove('open');
                openContent.style.maxHeight = null;
            });

            // Open the clicked accordion if it was closed
            if (!isOpen) {
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});
