const container = document.getElementById("events-container");

let eventsData = [];
let currentIndex = 0;
let currentEventIndex = 0;
let currentImageIndex = 0;

/* FORMAT DATE */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return {
    day: date.getDate(),
    month: date.toLocaleString("default", { month: "short" }),
  };
}

/* CREATE CARD */
function createCard(event, index) {
  const { day, month } = formatDate(event.date);

  return `
    <div class="event-card">
      <div class="event-image">
        <img src="${event.images[0]}" />
        <div class="event-date">
          <span>${day}</span>
          <small>${month}</small>
        </div>
      </div>

      <div class="event-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-meta">📍 ${event.location}</div>

        <a href="#" class="event-btn" data-index="${index}">
          Learn More →
        </a>
      </div>
    </div>
  `;
}

/* LOAD EVENTS */
async function loadEvents() {
  const res = await fetch("data/events.json");
  eventsData = await res.json();

  container.innerHTML = eventsData.map(createCard).join("");

  attachEvents();
}

/* MODAL ELEMENTS */
const modal = document.getElementById("event-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");
const modalLocation = document.getElementById("modal-location");

/* OPEN MODAL */
function openModal(index) {
  currentEventIndex = index;
  currentImageIndex = 0;

  const event = eventsData[index];

  updateModalContent(event);
  modal.classList.add("active");
}

function updateModalContent(event) {
  modalImg.src = event.images[currentImageIndex];
  modalTitle.textContent = event.title;
  modalDetails.textContent = event.details;
  modalLocation.textContent = "📍 " + event.location;
}

/* ATTACH CLICK EVENTS */
function attachEvents() {
  document.querySelectorAll(".event-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(Number(btn.dataset.index));
    });
  });
}

/* NAVIGATION */
document.getElementById("next-btn").onclick = () => {
  const event = eventsData[currentEventIndex];

  if (currentImageIndex < event.images.length - 1) {
    currentImageIndex++;
  } else {
    // move to next event
    currentEventIndex = (currentEventIndex + 1) % eventsData.length;
    currentImageIndex = 0;
  }

  updateModalContent(eventsData[currentEventIndex]);
};

document.getElementById("prev-btn").onclick = () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    // move to previous event
    currentEventIndex =
      (currentEventIndex - 1 + eventsData.length) % eventsData.length;

    const prevEvent = eventsData[currentEventIndex];
    currentImageIndex = prevEvent.images.length - 1;
  }

  updateModalContent(eventsData[currentEventIndex]);
};

/* CLOSE */
document.querySelector(".close-btn").onclick = () => {
  modal.classList.remove("active");
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

document.getElementById("volunteer-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Thank you for volunteering! We will contact you soon.");

  e.target.reset();
});

/* INIT */
loadEvents();
