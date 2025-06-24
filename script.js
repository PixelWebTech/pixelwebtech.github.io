// login
const PASSWORD = "avit";

let players = JSON.parse(localStorage.getItem("players") || "[]");
let history = [];
let darkMode = localStorage.getItem("darkMode") === "true";

const timeSlotColors = {
  "5h": "#FF5733",
  "5h30": "#66ccff", // ✅ Ajouté
  "6h": "#33FF57",
  "13h": "#3357FF",
  "13h30": "#FF33A1",
  "14h": "#FFA533",
  "14h30": "#33FFF2",
};

const timeSlotsOrder = ["5h", "5h30", "6h", "13h", "13h30", "14h", "14h30"]; // ✅ Ajouté 5h30

function checkLogin() {
  const input = document.getElementById("loginPassword").value.trim();
  const errorEl = document.getElementById("loginError");
  if (input === PASSWORD) {
    errorEl.style.display = "none";
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("splash").style.display = "block";
    setTimeout(() => {
      document.getElementById("splash").style.display = "none";
      document.querySelector(".container").style.display = "block";
      if (darkMode) document.body.classList.add("dark");
      render();
    }, 1000);
  } else {
    errorEl.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".container").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
});

function save() {
  localStorage.setItem("players", JSON.stringify(players));
}

function addPlayer() {
  const name = document.getElementById("playerName").value.trim();
  const slot = document.getElementById("timeSlot").value;

  if (!name || !slot) {
    alert("Veuillez entrer un nom et sélectionner un créneau.");
    return;
  }

  const timestamp = new Date().toISOString();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const color = timeSlotColors[slot] || "#ccc";

  players.push({ name, score: 0, color, addedAt: timestamp, initials, slot });
  saveHistory();
  save();
  render();

  document.getElementById("playerName").value = "";
  document.getElementById("timeSlot").value = "5h";
}

function increment(index) {
  players[index].score++;
  saveHistory();
  save();
  render();
}
function decrement(index) {
  players[index].score--;
  saveHistory();
  save();
  render();
}
function resetPlayer(index) {
  players[index].score = 0;
  saveHistory();
  save();
  render();
}
function deletePlayer(index) {
  if (!confirm("Supprimer cet avitailleur ?")) return;
  players.splice(index, 1);
  saveHistory();
  save();
  render();
}
function editPlayer(index) {
  const player = players[index];
  const newName = prompt("Nouveau nom :", player.name);
  const newTime = prompt(
    "Nouveau créneau (5h, 5h30, 6h, 13h, 13h30, 14h, 14h30) :",
    player.slot || ""
  );

  if (!newName || !timeSlotsOrder.includes(newTime)) {
    alert("Modification annulée ou créneau invalide.");
    return;
  }

  players[index].name = newName;
  players[index].slot = newTime;
  players[index].initials = newName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  players[index].color = timeSlotColors[newTime] || "#ccc";

  save();
  render();
}

function sortBy(mode) {
  if (mode === "scoreDesc") {
    players.sort((a, b) => b.score - a.score);
  } else if (mode === "scoreAsc") {
    players.sort((a, b) => a.score - b.score);
  } else if (mode === "timeAsc") {
    players.sort(
      (a, b) => timeSlotsOrder.indexOf(a.slot) - timeSlotsOrder.indexOf(b.slot)
    );
  }
}

function render() {
  // Affiche la date du jour (ajoute ce bloc au tout début)
  const dateElement = document.getElementById("currentDate");
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  dateElement.textContent = `📅 ${today}`;
  const mode = document.getElementById("sortMode").value;
  sortBy(mode);
  const container = document.getElementById("players");
  container.innerHTML = "";
  players.forEach((player, i) => {
    const el = document.createElement("div");
    el.className = "player";
    el.innerHTML = `
        <div class="color-bar" style="background:${player.color}"></div>
        <div class="info">
          <strong>${player.name} (${player.initials})</strong>
          <small>Créneau : ${player.slot}</small>
          <div class="score">✈️ ${player.score}</div>
        </div>
        <div class="actions">
          <button onclick="increment(${i})" title="Ajouter 1 point">+</button>
          <button onclick="decrement(${i})" title="Retirer 1 point">-</button>
          <button onclick="resetPlayer(${i})" title="Remettre le score à zéro">♻️</button>
          <button onclick="editPlayer(${i})" title="Modifier le joueur">✏️</button>
          <button onclick="deletePlayer(${i})" title="Supprimer le joueur">❌</button>
        </div>

        `;
    container.appendChild(el);
  });
  updateChart();
}

function saveHistory() {
  history.push(JSON.stringify(players));
  if (history.length > 20) history.shift();
}

function undo() {
  if (history.length === 0) return alert("Aucune action à annuler.");
  const last = history.pop();
  players = JSON.parse(last);
  save();
  render();
}

function exportTXT() {
  const today = new Date().toLocaleDateString('fr-FR');
  
  // En-tête
  let content = `Avitaillement - ${today}\n\n`;

  // Titres des colonnes avec alignement fixe
  content += pad("Nom", 20) + pad("Créneau", 10) + pad("Avions", 8) + "\n";
  content += "-".repeat(37) + "\n";

  // Lignes des joueurs
  players.forEach((p) => {
    content += pad(p.name, 20) + pad(p.slot, 10)+ pad(p.score.toString(), 8) + "\n";
  });

  // Création et téléchargement
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `avitaillement_${today.replace(/\//g, "-")}.txt`;
  a.click();
}

// Fonction utilitaire pour aligner le texte avec padding
function pad(str, length) {
  str = str.toString();
  return str + " ".repeat(Math.max(0, length - str.length));
}


function toggleDarkMode() {
  document.body.classList.toggle("dark");
  darkMode = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", darkMode);
}

function updateChart() {
  const ctx = document.getElementById("scoreChart").getContext("2d");
  if (window.chart) window.chart.destroy();
  window.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: players.map((p) => p.name),
      datasets: [
        {
          label: "Avions ravitaillés",
          data: players.map((p) => p.score),
          backgroundColor: players.map((p) => p.color),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

function resetAll() {
  if (players.length === 0) {
    alert("Il n'y a aucun joueur à effacer.");
    return;
  }
  if (
    confirm(
      "Êtes-vous sûr de vouloir effacer tous les avitailleurs pour la fin de journée ? Cette action est irréversible."
    )
  ) {
    players = [];
    saveHistory();
    save();
    render();
  }
}

