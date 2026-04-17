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
