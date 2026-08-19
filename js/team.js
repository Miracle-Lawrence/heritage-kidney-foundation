const boardContainer = document.getElementById("boardContainer");
const teamContainer = document.getElementById("teamContainer");

async function loadTeam() {
  try {
    const response = await fetch("data/team.json");
    const data = await response.json();

    displayBoard(data.boardOfTrustees);
    displayTeam(data.team);
  } catch (error) {
    boardContainer.innerHTML = "<p>Unable to load board members.</p>";
    teamContainer.innerHTML = "<p>Unable to load team members.</p>";

    console.error(error);
  }
}

function displayBoard(board) {
  boardContainer.innerHTML = "";

  board.forEach((member) => {
    const card = document.createElement("article");

    card.className = "board-card";

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">

      <div class="board-content">
        <h2>${member.name}</h2>

        <p class="qualification">${member.qualification}</p>

        <p class="position">${member.position}</p>
      </div>
    `;

    boardContainer.appendChild(card);
  });
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
