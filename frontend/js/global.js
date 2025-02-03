// // ------------------ Scrolled navbar js ----------------------
// // console.log("Script loaded");
// document.addEventListener("DOMContentLoaded", function () {
//     const navbarBelowWrapper = document.querySelector(".navbar_below_wrapper");

//     window.addEventListener("scroll", function () {
//         // console.log("Scroll event triggered:", window.scrollY); // Debugging
//         if (window.scrollY > 50) { // Adjust the scroll threshold as needed
//             navbarBelowWrapper.classList.add("scrolled");
//         } else {
//             navbarBelowWrapper.classList.remove("scrolled");
//         }
//     });




//     // Sidebar functionality
//     const openSidebarBtn = document.getElementById('open-sidebar');
//     const closeSidebarBtn = document.getElementById('close-sidebar');
//     const sidebar = document.getElementById('sidebar');
//     const overlay = document.getElementById('sidebarOverlay');

//     openSidebarBtn.addEventListener('click', () => {
//         sidebar.classList.add('open');
//         overlay.classList.add('visible');
//     });

//     closeSidebarBtn.addEventListener('click', () => {
//         sidebar.classList.remove('open');
//         overlay.classList.remove('visible');
//     });

//     overlay.addEventListener('click', () => {
//         sidebar.classList.remove('open');
//         overlay.classList.remove('visible');
//     });



// });


// document.addEventListener("DOMContentLoaded", function () {

//     const openSidebarBtn = document.getElementById("open-sidebar");

//     const closeSidebarBtn = document.getElementById("close-sidebar");

//     const sidebar = document.getElementById("sidebar");

//     const overlay = document.getElementById("sidebarOverlay");

//     // Open sidebar

//     openSidebarBtn.addEventListener("click", function () {

//         sidebar.classList.add("open");

//         overlay.classList.add("show");

//     });

//     // Close sidebar

//     closeSidebarBtn.addEventListener("click", function () {

//         sidebar.classList.remove("open");

//         overlay.classList.remove("show");

//     });

//     // Close sidebar when clicking outside (overlay)

//     overlay.addEventListener("click", function () {

//         sidebar.classList.remove("open");

//         overlay.classList.remove("show");

//     });

//     // Accordion functionality
//     const accordionHeaders = document.querySelectorAll('.accordion-header');

//     accordionHeaders.forEach(header => {
//         header.addEventListener('click', () => {
//             console.log("clicked");

//             const content = header.nextElementSibling;
//             if (!content) return; // Ensure content exists

//             const isOpen = content.classList.contains('open');
//             console.log("clicked", content, content.scrollHeight);


//             // Close all open accordions
//             document.querySelectorAll('.accordion-content.open').forEach(openContent => {
//                 openContent.classList.remove('open');
//                 openContent.style.maxHeight = null;
//             });

//             // Open the clicked accordion if it was closed
//             if (!isOpen) {
//                 content.classList.add('open');
//                 content.style.maxHeight = content.scrollHeight + "px";
//             }
//         });
//     });

// });

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    document.addEventListener("click", function (event) {
        console.log("Click detected on:", event.target); // Debugging output

        // Open sidebar
        if (event.target.closest("#open-sidebar")) {
            console.log("Opening sidebar...");

            const sidebar = document.querySelector(".navPhoneView .sidebar");
            const overlay = document.querySelector(".navPhoneView .overlay");

            if (sidebar && overlay) {
                sidebar.classList.add("open");
                overlay.classList.add("visible");
            } else {
                console.error("Sidebar or overlay not found!");
            }
        }

        // Close sidebar
        if (
            event.target.closest("#close-sidebar") ||
            event.target.closest(".navPhoneView .overlay")
        ) {
            console.log("Closing sidebar...");

            const sidebar = document.querySelector(".navPhoneView .sidebar");
            const overlay = document.querySelector(".navPhoneView .overlay");

            if (sidebar && overlay) {
                sidebar.classList.remove("open");
                overlay.classList.remove("visible");
            } else {
                console.error("Sidebar or overlay not found!");
            }
        }
    });

// Accordion functionality
if (event.target.closest(".accordion-header")) {
    const header = event.target.closest(".accordion-header");
    const content = header.nextElementSibling;

    console.log("Accordion clicked:", header, content);

    if (!content || !content.classList.contains("accordion-content")) {
        console.error("Accordion content not found!");
        return;
    }

    const isOpen = content.classList.contains("open");

    // Close all open accordions
    document.querySelectorAll(".accordion-content.open").forEach((openContent) => {
        openContent.classList.remove("open");
        openContent.style.maxHeight = null;
    });

    // Open the clicked accordion if it was closed
    if (!isOpen) {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        console.log("Accordion opened:", content);
    } else {
        console.log("Accordion closed.");
    }
}
});




