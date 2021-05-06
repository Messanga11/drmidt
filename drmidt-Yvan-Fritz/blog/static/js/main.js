window.onload = () => {
  const searchBtn = document.getElementById("searchBtn");
  const search = document.querySelector(".search");
  const searchInput = document.querySelector(".search input");
  const navMobile = document.querySelector(".nav__mobile");
  const navBar = document.getElementById("navwrapper");
  const hamburger = document.getElementById("hamburger");
  const navItems = document.querySelectorAll(".nav__item_h");
  const x = window.matchMedia("(max-width: 690px)");
  const navMobileHandler = function (x) {
    if (x.matches) {
      navBar.classList.remove("nav__wrapper");
      navBar.classList.add("nav__mobile");
    } else {
      navBar.classList.remove("nav__mobile");
      navBar.classList.add("nav__wrapper");
    }
  };
  searchBtn.onclick = () => {
    const loupeImg = document.createElement("img")
    loupeImg.src = "/static/assets/loupe.svg"
    loupeImg.alt = "loupe"
    const closeBtn = document.createElement("strong")
    closeBtn.textContent = "&times;"
    closeBtn.style.padding = "5px"
    if (searchInput.style.width == "200px") {
      searchBtn.textContent = ""
      search.classList.remove("border");
      searchInput.style.width = 0;
      loupeImg.append(loupeImg)
    } else {
      searchBtn.textContent = ""
      search.classList.add("border");
      searchInput.style.width = "200px";
      searchBtn.append(closeBtn)
    }
  };

  navMobile.onclick = (e) => {
    e.target.classList.contains("nav__mobile") &&
      (navMobile.style.left = "-100%");
  };

  hamburger.onclick = () => {
    navMobile.style.left = "0";
  };
  navMobileHandler(x);
  x.addListener(navMobileHandler);
};
