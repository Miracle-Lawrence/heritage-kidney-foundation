const service_id = "service_ar73m6t";
const volunteer_template_id = "template_o2wl7og";
const partner_template_id = "template_by5b941";


// Volunteer Form
document
  .getElementById("volunteer-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm(service_id, volunteer_template_id, this)
      .then(() => {
        alert("Volunteer application sent successfully!");
        this.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send. Please try again.");
      });
  });

// Partner Form
document
  .getElementById("partner-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm(service_id, partner_template_id, this)
      .then(() => {
        alert("Partnership request sent successfully!");
        this.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send. Please try again.");
      });
  });

const btn = this.querySelector("button");
btn.textContent = "Sending...";
btn.disabled = true;