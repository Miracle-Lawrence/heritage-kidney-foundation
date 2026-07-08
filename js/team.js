const teamContainer = document.getElementById("teamContainer");

async function loadTeam() {
  try {
    const response = await fetch("data/team.json");

    const team = await response.json();

    displayTeam(team);
  } catch (error) {
    teamContainer.innerHTML = "<p>Unable to load team members.</p>";

    console.error(error);
  }
}

function displayTeam(team) {
  teamContainer.innerHTML = "";

  team.forEach((member) => {
    const card = document.createElement("article");

    card.className = "team-card";

    card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">

            <div class="team-content">

                <h2>${member.name}</h2>

                <p class="role">${member.role}</p>

                <p class="description">${member.description}</p>

            </div>
        `;

    teamContainer.appendChild(card);
  });
}

loadTeam();
