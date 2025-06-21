let players = JSON.parse(localStorage.getItem("players") || "[]");
const colors = ["#e74c3c", "#f39c12", "#2ecc71", "#3498db", "#9b59b6", "#16a085", "#d35400"];
let timeColorMap = {};
let colorIndex = 0;

function save() {
  localStorage.setItem("players", JSON.stringify(players));
}

function getColorForTime(time) {
  if (!timeColorMap[time]) {
    timeColorMap[time] = colors[colorIndex % colors.length];
    colorIndex++;
  }
  return timeColorMap[time];
}

function addPlayer() {
  const name = document.getElementById("playerName").value.trim();
  const time = document.getElementById("startTime").value.trim();
  if (!name || !time) return;

  const color = getColorForTime(time);

  players.push({ name, time, score: 0, color });
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
  const container = document.getElementById("players");
  container.innerHTML = "";
  players.forEach((player, i) => {
    player.color = getColorForTime(player.time);

    const el = document.createElement("div");
    el.className = "player";
    el.innerHTML = `
      <div class="color-bar" style="background:${player.color}"></div>
      <div class="info">
        <strong>${player.name}</strong><br>
        <small>🕒 ${player.time}</small>
        <div class="score">${player.score}</div>
      </div>
      <div>
        <button onclick="increment(${i})">+</button>
        <button onclick="decrement(${i})">-</button>
        <button onclick="resetPlayer(${i})">♻️</button>
        <button onclick="deletePlayer(${i})">❌</button>
      </div>
    `;
    container.appendChild(el);
  });
}

render();
