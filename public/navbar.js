
  const hamburger = document.getElementById("hamburger");
  const closeIcon = document.getElementById("close_icon");
  const sidebar = document.getElementById("sidebar");

  hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");  // Add this line to debug

    sidebar.classList.add("open");  // when you click hamburger, sidebar slides in
  });

  closeIcon.addEventListener("click", () => {
    sidebar.classList.remove("open"); // when you click close icon, sidebar slides out
  });

  // DATE 
  const dateElement = document.getElementById("date");
  function updateDate() {
    const isMobile = window.innerWidth <= 480;
    const options = isMobile
      ? { weekday: "short", day: "numeric", month: "short" }
      : { weekday: "long", day: "numeric", month: "long", year: "numeric" };

    const date = new Date();
    dateElement.textContent = date.toLocaleDateString("en-US", options);
  }

  updateDate();
  window.addEventListener("resize", updateDate);

  // SEARCH BAR TOGGLE
  const searchIcon = document.getElementById("search_icon");
  const searchBar = document.getElementById("input_search_bar");

  searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("visible");
  });

  // PROFILE DROPDOWN TOGGLE
  const profileIcon = document.getElementById("profile_icon");
  const profileWrapper = document.querySelector(".profile_wrapper");

  profileIcon.addEventListener("click", () => {
    profileWrapper.classList.toggle("show");
  });
;
