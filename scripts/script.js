// Set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Remove Loading Screen after content loads
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Function to show a specific section
function showSection(id) {
  // Hide all sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });

  // Show the targeted section
  const targetSection = document.querySelector(id);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}

// Add event listeners for navigation links (only nav links, not social links)
document.querySelectorAll("nav .nav-links a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = link.getAttribute("href");
    showSection(targetId); // Show the clicked section
    history.pushState(null, "", targetId); // Update the URL without refreshing
  });
});

// Initialize the correct section on page load
const initialId = window.location.hash || "#about"; // Default to #about
showSection(initialId);

// Handle back/forward navigation
window.addEventListener("popstate", () => {
  const currentId = window.location.hash || "#about";
  showSection(currentId);
});

// Highlight active navigation link using IntersectionObserver
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav .nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the section is visible
);

sections.forEach((section) => observer.observe(section));

// Social icon link handling to ensure correct behavior
document.querySelectorAll("nav .social-icons a").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent interference with navigation logic
  });
});

// Category toggle functionality
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove 'active' class from all buttons
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add 'active' class to the clicked button
    button.classList.add("active");

    // Show the corresponding project list
    const category = button.getAttribute("data-category");
    document.querySelectorAll(".project-list").forEach((list) => {
      if (list.id === category) {
        list.style.display = "flex";
        list.setAttribute("aria-hidden", "false");
      } else {
        list.style.display = "none";
        list.setAttribute("aria-hidden", "true");
      }
    });
  });
});