// Get the navigation bar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Function to add the "sticky" class to the navbar when you reach its scroll position
function stickyNavbar() {
  
  if (window.scrollY >= sticky) {
    navbar.style.backgroundColor=white;
  } else {
    console.log("Removing sticky class");
    navbar.classList.remove("sticky");
  }
}

// When the user scrolls the page, execute stickyNavbar
window.onscroll = function() { stickyNavbar() };
