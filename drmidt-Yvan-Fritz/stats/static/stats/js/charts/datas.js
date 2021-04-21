let resp = 1;
const _pad = 40;
// Check if a region is selected
let clickedRegion = false
let clickedYear = false
const card = document.getElementsByClassName("card-stat")[0];
const s1CheckBox = document.getElementById("s1");
const s2CheckBox = document.getElementById("s2");
const s1c1CheckBox = document.getElementById("s1_c1");
const s1c2CheckBox = document.getElementById("s1_c2");
const s2c1CheckBox = document.getElementById("s2_c1");
const s2c2CheckBox = document.getElementById("s2_c2");
const _regionSelector = document.querySelectorAll(".regionSelector ul li")
const dataset = [
  {
    label: "Litoral",
    gains: {},
    pertes: {},
    EC: {},
  },
];
const filter = {}
const filteredData = {};

window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/chartstats/?format=json")
    .then((res) => res.json())
    .then((data) => data)
    .then((_data) => {
      fetch("/api-tds/TDS/?format=json")
        .then((res) => res.json())
        .then((dataJSON) => {
          const data = dataJSON.map((d) => {
            d.display = true;
            return d;
          });

          filteredData.s1_c1 = [...dataJSON.filter(x => x.Semestre == 1 && x.class_type == "1st")]
          filteredData.s1_c2 = [...dataJSON.filter(x => x.Semestre == 1 && x.class_type == "2nd")]
          filteredData.s2_c1 = [...dataJSON.filter(x => x.Semestre == 2 && x.class_type == "1st")]
          filteredData.s2_c2 = [...dataJSON.filter(x => x.Semestre == 2 && x.class_type == "2nd")]

          renderAllCharts([], _data);
          // Filters
          
        });
        const checkboxes = [
          s1CheckBox,
          s2CheckBox,
          s1c1CheckBox,
          s1c2CheckBox,
          s2c1CheckBox,
          s2c2CheckBox
        ]

        s1CheckBox.checked = true;
        s2CheckBox.checked = true;
        s1c1CheckBox.checked = true;
        s1c2CheckBox.checked = true;
        s2c1CheckBox.checked = true;
        s2c2CheckBox.checked = true;

        checkboxes.forEach(cb => {
          cb.onclick = () => {
            chartRemover()
            renderAllCharts([], _data);
          }
        })
        
    })
    .catch((err) => {
      document.write("Une erreur est survenue.");
      console.log(err);
    });
});

function chartRemover() {
  document.querySelector("#sommesDues").children[0]?.remove();
  document.querySelector("#repartEc").children[0]?.remove();
  document.querySelector("#statSem").textContent = ""
  document.querySelector("#fullStats").children[0]?.remove();
}

function renderAllCharts(data_, _data) {

  
  console.log(clickedRegion)
  console.log(clickedYear)

  let dataShow = []


  if(s1CheckBox.checked) {
    if(s1c1CheckBox.checked) {
      dataShow.push(...filteredData.s1_c1)
    }
    if(s1c2CheckBox.checked) {
      dataShow.push(...filteredData.s1_c2)
    }
    if(!s1c1CheckBox.checked && !s1c2CheckBox.checked) {
      dataShow.push(...filteredData.s1_c1)
      dataShow.push(...filteredData.s1_c2)
    }
  }
  if(s2CheckBox.checked) {
    if(s2c1CheckBox.checked) {
      dataShow.push(...filteredData.s2_c1)
    }
    if(s2c2CheckBox.checked) {
      dataShow.push(...filteredData.s2_c2)
    }
    if(!s2c1CheckBox.checked && !s2c2CheckBox.checked) {
      dataShow.push(...filteredData.s2_c1)
      dataShow.push(...filteredData.s2_c2)
    }
  }
  if(!s1CheckBox.checked && !s2CheckBox.checked) {
    dataShow.push(...filteredData.s1_c1)
    dataShow.push(...filteredData.s1_c2)
    dataShow.push(...filteredData.s2_c1)
    dataShow.push(...filteredData.s2_c2)
  }

  if(clickedYear) {
      dataShow = clickedYear !== "all" ? dataShow.filter(x => {
        return clickedYear !== "all" && String(x.year) === String(clickedYear)
      }) : [...filteredData.s1_c1, ...filteredData.s1_c2, ...filteredData.s2_c1, ...filteredData.s2_c2]
  }
  
  if(clickedRegion) {
    if(clickedYear) {
      dataShow = clickedYear !== "all" ? dataShow.filter(x => {
        return clickedYear !== "all" && String(x.year) === String(clickedYear)
      }) : [...filteredData.s1_c1, ...filteredData.s1_c2, ...filteredData.s2_c1, ...filteredData.s2_c2]
    }
      dataShow = clickedRegion !== "région" ? dataShow.filter(x => {
        return clickedRegion !== "région" && String(x.department).toLowerCase() === clickedRegion
      }) : [...filteredData.s1_c1, ...filteredData.s1_c2, ...filteredData.s2_c1, ...filteredData.s2_c2]
  }

  let data = dataShow;
  _regionSelector.forEach(li => {
    li.onclick = function(e) {
      clickedRegion = String(e.target.textContent).toLowerCase()
        const data__ =  clickedRegion !== "région" ? dataShow.filter(x => {
          return clickedRegion !== "région" && String(x.department).split("-").join(" ").toLowerCase() === String(e.target.textContent).toLowerCase()
        }) : [...filteredData.s1_c1, ...filteredData.s1_c2, ...filteredData.s2_c1, ...filteredData.s2_c2]
        chartRemover()
        renderAllCharts(data__, _data)
    }
  })

  console.log(dataset)

  const years = [];
  data?.map((depStat) => {
    if (!years.includes(Number(depStat.year))) {
      years.push(Number(depStat.year));
    }
  });

  
  // Sort years
  years?.sort((a, b) => b - a);
  years?.forEach((y) => {
    filter[y] = data
    .map((d) => d.year == y && d)
    .filter((d) => typeof d != "boolean");
  });
  
  years.reverse().forEach(y => {
    let li = document.createElement("li")
    let a = document.createElement("a")
    a.href = "#" + y
    a.textContent = y
    li.append(a)
    document.querySelector(".yearSelector ul").prepend(li)
  })

  
const yearATags = document.querySelectorAll(".year-selector a");

  yearATags.forEach(a => {
    a.onclick = function(e) {
      clickedYear = String(e.target.textContent).toLowerCase()
        const data__ =  clickedYear !== "all" ? dataShow.filter(x => {
          return clickedYear !== "all" && String(x.year) === String(e.target.textContent)
        }) : [...filteredData.s1_c1, ...filteredData.s1_c2, ...filteredData.s2_c1, ...filteredData.s2_c2]
        chartRemover()
        renderAllCharts(data__, _data)
    }
  })

  if(data_?.length > 0) {
    data = data_
  }

  console.log(data)

  // Somme Dues
  _data?.map((dep) => {
    dataset[0].gains[dep.department] = Number(dep.money);
    dataset[0].pertes[dep.department] = Number(dep.recovered);
  });

  /* ---------------- EC DATAS -------------------- */
  dataset[0].EC["wouri"] = data?.reduce((a, c) => {
    if (c.department === "wouri") {
      return a + Number(c.nombre_de_ec_en_activite);
    } else {
      return a + 0;
    }
  }, 0);
  dataset[0].EC["moungo"] = data?.reduce((a, c) => {
    if (c.department === "moungo") {
      return a + Number(c.nombre_de_ec_en_activite);
    } else {
      return a + 0;
    }
  }, 0);
  dataset[0].EC["nkam"] = data?.reduce((a, c) => {
    if (c.department === "nkam") {
      return a + Number(c.nombre_de_ec_en_activite);
    } else {
      return a + 0;
    }
  }, 0);
  dataset[0].EC["sanaga-maritime"] = data?.reduce((a, c) => {
      if (c.department === "sanaga-maritime") {
        return a + Number(c.nombre_de_ec_en_activite);
      } else {
        return a + 0;
      }
  }, 0);
  /* ################# TABLE STATS ####################### */
  data?.map((depStat) => {
    if (!years.includes(Number(depStat.year))) {
      years.push(Number(depStat.year));
    }
  });
  // Sort years
  years.sort((a, b) => b - a);
  const statSemData = [];
  const recovered = [];
  years.forEach((year, i) => {
    const row1 = [`1.${year}`, "Premiere Classe", 0, 0, 0, 0, 0, 0, 0, 0]; // 1st Semeter 1st class
    const row2 = [`1.${year}`, "Deuxieme Classe", 0, 0, 0, 0, 0, 0, 0, 0]; // 1st Semester 2nd class
    const row3 = [`2.${year}`, "Premiere Classe", 0, 0, 0, 0, 0, 0, 0, 0]; // 2nd Semester 1st class
    const row4 = [`2.${year}`, "Deuxieme Classe", 0, 0, 0, 0, 0, 0, 0, 0]; // 2nd Semester 2nd class
    let rec1 = 0;
    let rec2 = 0;
    let rec3 = 0;
    let rec4 = 0;
    data?.forEach((depStat) => {
      if (
        year === Number(depStat.year) &&
        Number(depStat.Semestre) === 1 &&
        depStat.class_type == "1st"
      ) {
        row1[2] += Number(depStat.nombre_de_ec_en_activite);
        row1[3] += Number(depStat.nombre_de_ec_nouveaux);
        row1[4] += Number(depStat.nombre_de_ec_programmes);
        row1[5] += Number(depStat.nombre_de_ec_inspectes);
        row1[6] += Number(depStat.nombre_de_ec_autorise_or_declares);
        row1[7] += Number(depStat.nombre_de_ec_en_activite);
        row1[8] += Math.floor(
          Number(depStat.montant_des_ESD_generes_or_superficiaires) +
            Number(depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE)
        );
        row1[9] += Number(
          depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE
        );
        rec1 += Number(depStat.recouvres);
      }
      if (
        year === Number(depStat.year) &&
        Number(depStat.Semestre) === 1 &&
        depStat.class_type == "2nd"
      ) {
        row2[2] += depStat.nombre_de_ec_en_activite;
        row2[3] += depStat.nombre_de_ec_nouveaux;
        row2[4] += depStat.nombre_de_ec_programmes;
        row2[5] += depStat.nombre_de_ec_inspectes;
        row2[6] += depStat.nombre_de_ec_autorise_or_declares;
        row2[7] += depStat.nombre_de_ec_en_activite;
        row2[8] += Math.floor(
          Number(depStat.montant_des_ESD_generes_or_superficiaires) +
            Number(depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE)
        );
        row2[9] += Number(
          depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE
        );
        rec2 += Number(depStat.recouvres);
      }
      if (
        year === Number(depStat.year) &&
        Number(depStat.Semestre) === 2 &&
        depStat.class_type == "1st"
      ) {
        row3[2] += depStat.nombre_de_ec_en_activite;
        row3[3] += depStat.nombre_de_ec_nouveaux;
        row3[4] += depStat.nombre_de_ec_programmes;
        row3[5] += depStat.nombre_de_ec_inspectes;
        row3[6] += depStat.nombre_de_ec_autorise_or_declares;
        row3[7] += depStat.nombre_de_ec_en_activite;
        row3[8] += Math.floor(
          Number(depStat.montant_des_ESD_generes_or_superficiaires) +
            Number(depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE)
        );
        row3[9] += Number(
          depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE
        );
        rec3 += Number(depStat.recouvres);
      }
      if (
        year === Number(depStat.year) &&
        Number(depStat.Semestre) === 2 &&
        depStat.class_type == "2nd"
      ) {
        row4[2] += depStat.nombre_de_ec_en_activite;
        row4[3] += depStat.nombre_de_ec_nouveaux;
        row4[4] += depStat.nombre_de_ec_programmes;
        row4[5] += depStat.nombre_de_ec_inspectes;
        row4[6] += depStat.nombre_de_ec_autorise_or_declares;
        row4[7] += depStat.nombre_de_ec_en_activite;
        row4[8] += Math.floor(
          Number(depStat.montant_des_ESD_generes_or_superficiaires) +
            Number(depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE)
        );
        row4[9] += Number(
          depStat.montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE
        );
        rec4 += Number(depStat.recouvres);
      }
    });
    recovered.push([rec1, rec2, rec3, rec4]);
    statSemData.push(row3);
    statSemData.push(row4);
    statSemData.push(row1);
    statSemData.push(row2);
  });
  for (let i = 0; i < statSemData.length; i++) {
    // Limit to only 2months 4 rows * 2
    if (i === 8) {
      break;
    } else {
      let row = document.createElement("div");
      row.classList.add("row");
      statSemData[i].forEach((x) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerText = x;
        row.append(col);
      });
      document.getElementById("statSem").append(row);
    }
  }
  /* ######################### FULL STATS ################## */
  const data1 = [0, 0, 0, 0, 0, 0];
  const data2 = [0, 0, 0, 0, 0, 0];
  years.forEach((year, k) => {
    // 4 row in the fullstats table = 1 year
    for (let i = 4 * k; i < 4 * k + 4; i++) {
      data1[k] += statSemData[i][8]; // statSemData[8] = ESD généré
    }
    for (let i = 0; i < recovered[k].length; i++) {
      data2[k] += Number(recovered[k][i]);
    }
  });
  fsTRs = document.querySelector(".fullStats-wrapper").children[1].children[0]
    .children; // FullStats Table tr elements
  for (let i = 0; i < fsTRs.length; i++) {
    for (let j = 0; j < fsTRs.length; j++) {
      if (i === 0) {
        fsTRs[i].children[j + 1].textContent = years[j];
      }
      if (i === 1) {
        fsTRs[i].children[j + 1].textContent = data1[j];
      }
      if (i === 2) {
        fsTRs[i].children[j + 1].textContent = data2[j];
      }
    }
  }
  //Drawiwng
  drawFullStats(
    document.getElementById("fullStats").clientWidth -
      document.getElementById("ff_td").clientWidth +
      _pad * resp,
    400,
    data1,
    data2
  );
  drawSommeDues(card.clientWidth, card.clientHeight - 15);
  drawRepartEC(card.clientWidth, card.clientHeight);
  window.addEventListener("resize", () => {
    chartRemover();
    drawSommeDues(card.clientWidth, card.clientHeight - 15);
    drawRepartEC(card.clientWidth, card.clientHeight);
    drawFullStats(
      document.getElementById("fullStats").clientWidth -
        document.getElementById("ff_td").clientWidth +
        _pad * resp,
      400,
      data1,
      data2
    );
  });
  /* ################# MAP ####################### */
  //##################################################
  const regionData = document.querySelector(".region-data");
  const map = document.querySelector("#map");
  const pRegionData = document.querySelectorAll(".region-data .val");
  const depsCountDatas = {
    wouri: {
      name: "Wouri",
      inspects: data?.reduce((a, c) => {
        if (c.department === "wouri" && c.year == new Date().getFullYear()) {
          return a + c;
        } else {
          return a + 0;
        }
      }, 0),
    },
    _Nkam: {
      name: "Nkam",
      inspects: data?.reduce((a, c) => {
        if (c.department === "nkam" && c.year == new Date().getFullYear()) {
          return a + Number(c.nombre_de_ec_inspectes);
        } else {
          return a + 0;
        }
      }, 0),
    },
    Moungo: {
      name: "Moungo",
      inspects: data?.reduce((a, c) => {
        if (c.department === "moungo" && c.year == new Date().getFullYear()) {
          return a + Number(c.nombre_de_ec_inspectes);
        } else {
          return a + 0;
        }
      }, 0),
    },
    sanaga_maratime: {
      name: "Sanaga Maritime",
      inspects: data?.reduce((a, c) => {
        if (
          c.department === "sanaga-maritime" &&
          c.year == new Date().getFullYear()
        ) {
          return a + Number(c.nombre_de_ec_inspectes);
        } else {
          return a + 0;
        }
      }, 0),
    },
  };
  const fillRegionData = (region) => {
    document.querySelector(".region-data h3").innerHTML =
      depsCountDatas[region].name;
    pRegionData[0].textContent = depsCountDatas[region].inspects;
  };
  map.onmousemove = (e) => {
    regionData.style.left =
      e.clientX - map.getBoundingClientRect().x - 20 + "px";
    regionData.style.top =
      e.clientY - map.getBoundingClientRect().y + 40 + "px";
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
  const elH2 = document.querySelectorAll(".recapEl .bottom .el h2");
  elH2[0].textContent = data?.reduce((a, c) => {
    if (c.class_type === "1st") {
      return a + Number(c.nombre_de_ec_en_activite);
    } else {
      return a + 0;
    }
  }, 0);
  elH2[1].textContent = data?.reduce((a, c) => {
    if (c.class_type === "1st") {
      return a + Number(c.taux_de_couverture);
    } else {
      return a + 0;
    }
  }, 0);
  elH2[2].textContent = data?.reduce((a, c) => {
    if (c.class_type === "1st") {
      return a + Number(c.taux_de_conformite);
    } else {
      return a + 0;
    }
  }, 0);
  elH2[3].textContent = data?.reduce((a, c) => {
    if (c.class_type === "2nd") {
      return a + Number(c.nombre_de_ec_en_activite);
    } else {
      return a + 0;
    }
  }, 0);
  elH2[4].textContent = data?.reduce((a, c) => {
    if (c.class_type === "2nd") {
      return a + Number(c.taux_de_couverture);
    } else {
      return a + 0;
    }
  }, 0);
  elH2[5].textContent = data?.reduce((a, c) => {
    if (c.class_type === "2nd") {
      return a + Number(c.taux_de_conformite);
    } else {
      return a + 0;
    }
  }, 0);
}
