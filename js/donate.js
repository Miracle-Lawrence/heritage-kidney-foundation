fetch("data/patients.json")
  .then((response) => response.json())
  .then((data) => {
    const dialysisSelect = document.querySelector(".dialysis-patient");
    const transplantSelect = document.querySelector(".transplant-patient");

    data.patients.forEach((patient) => {
      const option1 = document.createElement("option");
      option1.value = patient.name;
      option1.textContent = patient.name;

      const option2 = document.createElement("option");
      option2.value = patient.name;
      option2.textContent = patient.name;

      dialysisSelect.appendChild(option1);
      transplantSelect.appendChild(option2);
    });
  })
  .catch((error) => console.log("Error loading patients:", error));

const modal = document.getElementById("donationModal");
const closeModal = document.getElementById("closeModal");
const donationAmountText = document.getElementById("donationAmount");
const whatsappLink = document.getElementById("whatsappLink");

// Replace with your actual WhatsApp number
const whatsappNumber = "2349167760222";

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

function payWithPaystack(type) {
  let patientName = "";
  let amount = 0;

  if (type === "dialysis") {
    patientName = document.querySelector(".dialysis-patient").value;
    amount = document.querySelector(".dialysis .amount-input").value;
  } else {
    patientName = document.querySelector(".transplant-patient").value;
    amount = document.querySelector(".transplant .amount-input").value;
  }

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // DISPLAY AMOUNT
  document.getElementById("donationAmount").textContent =
    `₦${Number(amount).toLocaleString()}`;

  // DISPLAY SELECTED PATIENT
  document.getElementById("selectedPatient").textContent =
    `Beneficiary: ${patientName}`;

  // CREATE WHATSAPP MESSAGE
  const message = `Hello, I just donated ₦${Number(
    amount,
  ).toLocaleString()} to Heritage Kidney and Medical Care for ${patientName}. Here is my receipt.`;

  const encodedMessage = encodeURIComponent(message);

  // SET WHATSAPP LINK
  whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // SHOW MODAL
  document.getElementById("donationModal").style.display = "flex";
}

function copyAccount() {
  navigator.clipboard.writeText("0510034648");
  alert("Account number copied!");
}