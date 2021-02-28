const searchBtn = document.getElementById("searchBtn");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search input");
const navMobile = document.querySelector(".nav__mobile");
const navBar = document.getElementById("navwrapper");
const hamburger = document.getElementById("hamburger");
const x = window.matchMedia("(max-width: 690px)");

const navMobileHandler = (x) => {
  if (x.matches) {
    navBar.classList.remove("nav__wrapper");
    navBar.classList.add("nav__mobile");
  } else {
    navBar.classList.remove("nav__mobile");
    navBar.classList.add("nav__wrapper");
  }
};

window.onload = () => {
  searchBtn.onclick = () => {
    if (searchInput.style.width == "200px") {
      search.classList.remove("border");
      searchInput.style.width = 0;
      searchBtn.innerHTML = `<img src="assets/loupe.svg" alt="loupe">`;
    } else {
      search.classList.add("border");
      searchInput.style.width = "200px";
      searchBtn.innerHTML = `<strong style="padding: 5px;">X</strong>`;
    }
  };

  navMobile.onclick = (e) => {
    e.target.classList.contains("nav__mobile") &&
      (navMobile.style.left = "-100%");
  };

  hamburger.onclick = () => {
    navMobile.style.left = "0";
  };
};

navMobileHandler(x);
x.addListener(navMobileHandler);
