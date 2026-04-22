const container = document.getElementById("events-container");

let eventsData = [];
let currentIndex = 0;

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
        <img src="${event.image}" />
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
  currentIndex = index;
  const event = eventsData[index];

  modalImg.src = event.image;
  modalTitle.textContent = event.title;
  modalDetails.textContent = event.details;
  modalLocation.textContent = "📍 " + event.location;

  modal.classList.add("active");
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
  currentIndex = (currentIndex + 1) % eventsData.length;
  openModal(currentIndex);
};

document.getElementById("prev-btn").onclick = () => {
  currentIndex = (currentIndex - 1 + eventsData.length) % eventsData.length;
  openModal(currentIndex);
};

/* CLOSE */
document.querySelector(".close-btn").onclick = () => {
  modal.classList.remove("active");
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

/* INIT */
loadEvents();
