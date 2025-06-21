let players = JSON.parse(localStorage.getItem("players") || "[]");
const colors = ["#e74c3c", "#f39c12", "#2ecc71", "#3498db", "#9b59b6", "#16a085", "#d35400"];
let timeColorMap = {};
let colorIndex = 0;

function save() {
  localStorage.setItem("players", JSON.stringify(players));
}

function getColorIndexForTime(time) {
  if (!(time in timeColorMap)) {
    timeColorMap[time] = colorIndex % colors.length;
    colorIndex++;
  }
  return timeColorMap[time];
}

function getColorValue(index) {
  return colors[index % colors.length];
}

function addPlayer() {
  const name = document.getElementById("playerName").value.trim();
  const time = document.getElementById("startTime").value.trim();
  if (!name || !time) return;

  const colorId = getColorIndexForTime(time);
  players.push({ name, time, score: 0, colorId });

  document.getElementById("playerName").value = "";
  document.getElementById("startTime").value = "";
  save();
  render();
}

function increment(index) {
  players[index].score++;
  save();
  render();
}

function decrement(index) {
  players[index].score--;
  save();
  render();
}

function resetPlayer(index) {
  players[index].score = 0;
  save();
  render();
}

function deletePlayer(index) {
  players.splice(index, 1);
  save();
  render();
}

function editPlayer(index) {
  const newName = prompt("Modifier le nom :", players[index].name);
  if (newName === null) return;
  const newTime = prompt("Modifier l'horaire (HH:MM) :", players[index].time);
  if (newTime === null) return;

  players[index].name = newName.trim() || players[index].name;
  players[index].time = newTime.trim() || players[index].time;
  save();
  render();
}

function sortPlayers() {
  players.sort((a, b) => b.score - a.score);
  render();
}

function resetAll() {
  if (confirm("Tout réinitialiser ?")) {
    players.forEach(p => p.score = 0);
    save();
    render();
  }
}

function exportCSV() {
  const header = "Nom,Horaire,Score\n";
  const rows = players.map(p => `${p.name},${p.time},${p.score}`).join("\n");
  const csvContent = header + rows;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "joueurs.csv");
  link.click();
}

function render() {
  timeColorMap = {};
  colorIndex = 0;
  const filterTime = document.getElementById("filterTime")?.value || "";

  const container = document.getElementById("players");
  container.innerHTML = "";
  players.forEach((player, i) => {
    if (filterTime && player.time !== filterTime) return;

    player.colorId = getColorIndexForTime(player.time);
    const el = document.createElement("div");
    el.className = "player";
    el.setAttribute("data-color", `color-${player.colorId}`);
    el.innerHTML = `
      <div class="color-bar"></div>
      <div class="info">
        <strong>${player.name}</strong><br>
        <small>🕒 ${player.time}</small>
        <div class="score">${player.score}</div>
      </div>
      <div>
        <button onclick="increment(${i})">+</button>
        <button onclick="decrement(${i})">-</button>
        <button onclick="resetPlayer(${i})">♻️</button>
        <button onclick="editPlayer(${i})">✏️</button>
        <button onclick="deletePlayer(${i})">❌</button>
      </div>
    `;
    container.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const filterInput = document.createElement("input");
  filterInput.id = "filterTime";
  filterInput.type = "time";
  filterInput.placeholder = "Filtrer par horaire";
  filterInput.onchange = render;

  const controls = document.querySelector(".controls");
  controls.appendChild(filterInput);

  render();
});

