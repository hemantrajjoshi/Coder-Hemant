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

// active function 
function active(event) {
  // Prevent the default anchor behavior
  event.preventDefault();
  
  // Remove the active class from all navigation links
  const navLinks = document.querySelectorAll('#menu a');
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Add the active class to the clicked link
  event.currentTarget.classList.add('active');
  
  // Optionally, redirect to the link's href after a delay (or handle with AJAX)
  window.location.href = event.currentTarget.href;
}

// NEWSLETTER FUNCTIONALTY
document.addEventListener("DOMContentLoaded", function() {
  let subID = document.getElementById("subID");
  let form = document.getElementById("n-letter");

  subID.onclick = function(event) {
      event.preventDefault(); // Prevent form submission
      
      // Check if the form is valid
      if (form.checkValidity()) {
          alert("Newsletter Subscribed successfully!");
          form.reset(); // Clear the form
          subID.style.backgroundColor=""
      } else {
          alert("Please enter a valid email address.");
      }
  };
});