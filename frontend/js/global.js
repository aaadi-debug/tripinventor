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
});
