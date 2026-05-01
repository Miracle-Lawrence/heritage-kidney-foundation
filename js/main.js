// ==================== NAVBAR MENU ====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

/* INIT PAGE */
document.addEventListener("DOMContentLoaded", () => {
  // Only runs if container exists (safe for multi-page site)
  loadEvents("events-container");
});

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close menu when clicking overlay
overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  }
});

// ==================== MOBILE SEARCH ====================
const mobileSearchInput = document.querySelector(".mobile-search input");
const mobileResults = document.createElement("div");
mobileResults.classList.add("search-results");
document.querySelector(".mobile-search").appendChild(mobileResults);

const searchData = [
  "Dialysis",
  "Kidney Transplant",
  "Laboratory Services",
  "Patient Care",
  "Emergency Services",
  "Consultation",
  "Outreach Programs",
];

// Mobile live search
mobileSearchInput.addEventListener("input", () => {
  const value = mobileSearchInput.value.toLowerCase();
  mobileResults.innerHTML = "";

  if (!value) {
    mobileResults.style.display = "none";
    return;
  }

  const filtered = searchData.filter((item) =>
    item.toLowerCase().includes(value),
  );

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.addEventListener("click", () => {
      mobileSearchInput.value = item;
      mobileResults.style.display = "none";
    });
    mobileResults.appendChild(div);
  });

  mobileResults.style.display = "block";
});

// ==================== DESKTOP SEARCH ====================
const searchToggle = document.getElementById("searchToggle");
const searchBox = document.getElementById("searchBox");
const desktopInput = document.getElementById("desktopSearchInput");
const desktopResults = document.getElementById("desktopSearchResults");

// Toggle desktop search bar
searchToggle.addEventListener("click", (e) => {
  e.preventDefault();
  searchBox.classList.toggle("active");
  desktopInput.focus();
});

// Close desktop search when clicking outside
document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
    searchBox.classList.remove("active");
  }
});

// Desktop live search
desktopInput.addEventListener("input", () => {
  const value = desktopInput.value.toLowerCase();
  desktopResults.innerHTML = "";

  if (!value) {
    desktopResults.style.display = "none";
    return;
  }

  const filtered = searchData.filter((item) =>
    item.toLowerCase().includes(value),
  );

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.addEventListener("click", () => {
      desktopInput.value = item;
      desktopResults.style.display = "none";
    });
    desktopResults.appendChild(div);
  });

  desktopResults.style.display = "block";
});

// ==================== NAVBAR SHRINK ON SCROLL ====================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

// ==================== ACTIVE PAGE HIGHLIGHT ====================
const navItems = document.querySelectorAll(".nav-links a");
const currentPath = window.location.pathname.split("/").pop(); // get file name

navItems.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

const modal = document.getElementById("donationModal");
const closeModal = document.getElementById("closeModal");
const donationAmountText = document.getElementById("donationAmount");
const whatsappLink = document.getElementById("whatsappLink");

// Replace with your actual WhatsApp number
const whatsappNumber = "2348038105601";

// Format currency
function formatCurrency(amount) {
  return "₦" + Number(amount).toLocaleString();
}

// Open modal
function openDonationModal(amount) {
  donationAmountText.textContent = formatCurrency(amount);

  const message = `Hello, I just donated ${formatCurrency(amount)} to Heritage Kidney and Medical Care. Here is my receipt.`;
  const encodedMessage = encodeURIComponent(message);

  whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  modal.style.display = "flex";
}

// Close modal
closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Handle amount buttons
document.querySelectorAll(".amount-options button").forEach((btn) => {
  btn.addEventListener("click", function () {
    const amount = this.dataset.amount;
    const box = this.closest(".donation-box");
    box.querySelector(".amount-input").value = amount;
  });
});

// Override donate buttons
function payWithPaystack(type) {
  const box = document.querySelector(`.${type}`);
  const input = box.querySelector(".amount-input").value;

  if (!input || input <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  openDonationModal(input);
}

function copyAccount() {
  navigator.clipboard.writeText("9068699057");
  alert("Account number copied!");
}