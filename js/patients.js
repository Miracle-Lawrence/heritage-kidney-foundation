async function loadPatients() {
  try {
    const response = await fetch("data/patients.json");
    const data = await response.json();

    const container = document.getElementById("caseContainer");

    data.patients.forEach((patient) => {
      const percentage = Math.min(
        (patient.raised / patient.target) * 100,
        100,
      ).toFixed(0);

      const card = `
        <div class="case-card">
          <img src="${patient.image}" alt="${patient.name}">

          <h3>${patient.name}</h3>
          <p>${patient.description}</p>

          <div class="progress-bar">
            <div class="progress" style="width: ${percentage}%;"></div>
          </div>

          <p class="amount">
            ₦${patient.raised.toLocaleString()} raised of 
            ₦${patient.target.toLocaleString()}
          </p>

          <a href="donate.html" class="btn-primary">Support Now</a>
        </div>
      `;

      container.innerHTML += card;
    });
  } catch (error) {
    console.error("Error loading patients:", error);
  }
}

loadPatients();
