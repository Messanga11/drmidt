const anneesBtn = document.getElementById("annesBtn");
const yearATags = document.querySelectorAll(".yearSelector a");
const regionSelector = document.querySelector(".regionSelector button");

document.querySelector(".yearSelector a").classList.add("active");
document.querySelector(".regionSelector a").classList.add("active");

for (a of yearATags) {
  a.addEventListener("click", (e) => {
    for (a of yearATags) {
      a.classList.remove("active");
    }
    e.target.classList.add("active");
  });
}

anneesBtn.onclick = () => {
  document.querySelector(".yearSelector ul").classList.toggle("showYear");
};
regionSelector.onclick = () => {
  document.querySelector(".regionSelector ul").classList.toggle("showRegion");
};

// ############ MAP ########################################
const regionData = document.querySelector(".region-data");
const map = document.querySelector("#map");
const pRegionData = document.querySelectorAll(".region-data .val");
const datas = {
  wouri: {
    name: "Wouri",
    inspects: 23,
    totalEts: 26,
    etsConf: 18,
  },
  _Nkam: {
    name: "Nkam",
    inspects: 62,
    totalEts: 70,
    etsConf: 10,
  },
  Moungo: {
    name: "Moungo",
    inspects: 37,
    totalEts: 42,
    etsConf: 21,
  },
  sanaga_maratime: {
    name: "Sanaga Maretime",
    inspects: 32,
    totalEts: 42,
    etsConf: 21,
  },
};
const fillRegionData = (region) => {
  document.querySelector(".region-data h3").innerHTML = datas[region].name;
  pRegionData[0].innerHTML = datas[region].inspects;
  pRegionData[1].innerHTML = datas[region].totalEts;
  pRegionData[2].innerHTML = datas[region].etsConf;
};
map.onmousemove = (e) => {
  regionData.style.left = e.clientX - map.getBoundingClientRect().x - 20 + "px";
  regionData.style.top = e.clientY - map.getBoundingClientRect().y + 40 + "px";
};
document.querySelectorAll("#map path").forEach((path) => {
  path.addEventListener("mouseenter", () => {
    regionData.style.opacity = "1";
    regionData.style.visibility = "visible";
  });
  path.addEventListener("mouseover", (e) => {
    fillRegionData(path.getAttribute("id"));
  });
  path.addEventListener("mouseout", (e) => {
    regionData.style.opacity = "0";
    regionData.style.visibility = "hidden";
  });
});

/* ################# TABLE STATS ####################### */

const statSemData = [
  [1.2019, "Première Classe", 03, 5, 80, 76, 42, 262, 107057325, 3920900],
  [1.2019, "Première Classe", 03, 5, 80, 76, 42, 262, 107057325, 3920900],
  [1.2019, "Première Classe", 03, 5, 80, 76, 42, 262, 107057325, 3920900],
  [1.2019, "Première Classe", 03, 5, 80, 76, 42, 262, 107057325, 3920900],
  [1.2019, "Première Classe", 03, 5, 80, 76, 42, 262, 107057325, 3920900],
];

statSemData.forEach((data) => {
  let row = document.createElement("div");
  row.classList.add("row");
  data.forEach((x) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerText = x;
    row.append(col);
  });
  document.getElementById("statSem").append(row);
});
