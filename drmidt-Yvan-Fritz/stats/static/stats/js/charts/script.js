const anneesBtn = document.getElementById("annesBtn");
const regionSelector = document.querySelector(".regionSelector button");

document.querySelector(".yearSelector a").classList.add("active");
document.querySelector(".regionSelector a").classList.add("active");

anneesBtn.onclick = () => {
  document.querySelector(".yearSelector ul").classList.toggle("showYear");
};
regionSelector.onclick = () => {
  document.querySelector(".regionSelector ul").classList.toggle("showRegion");
};
