console.log("Navbar JS Loaded");
console.log(document.getElementById("hamburger"));
console.log(document.getElementById("sidebar"));
console.log(document.getElementById("close_icon"))
  const hamburger = document.getElementById("hamburger");
  const closeIcon = document.getElementById("close_icon");
  const sidebar = document.getElementById("sidebar");

 // Hamburger click
 try {
  hamburger.addEventListener("click", (e) => {
    console.log("hamburger menu is Clicked!"); // Check if this logs
    sidebar.classList.add("open");
  });
} catch (error) {
  console.error("Hamburger error:", error); // Logs the exact issue
}

// Close icon click
closeIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent event bubbling
  console.log("Close icon clicked!");
  sidebar.classList.remove("open");
});
// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove("open");
  }
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
    console.log("search icon is cliked")
    searchBar.classList.toggle("visible");
  });

  // PROFILE DROPDOWN TOGGLE
  const profileIcon = document.getElementById("profile_icon");
  const profileWrapper = document.querySelector(".profile_wrapper");

  profileIcon.addEventListener("click", () => {
    console.log("profile is clicked")
    profileWrapper.classList.toggle("show");
  });
;
