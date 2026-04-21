const slides = document.querySelectorAll(".hero-slide");
let current = 0;

function showNextSlide() {
  // remove active
  slides[current].classList.remove("active");

  // move to next
  current = (current + 1) % slides.length;

  // add active
  slides[current].classList.add("active");
}

setInterval(showNextSlide, 5000);

const previewCards = document.querySelectorAll(".preview-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

previewCards.forEach((card) => observer.observe(card));

const buttons = document.querySelectorAll(".amount-grid button");
const amountInput = document.querySelector("input[type='number']");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    amountInput.value = btn.innerText.replace(/[^\d]/g, "");
  });
});
