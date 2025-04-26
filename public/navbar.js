// ===== navbar.js =====


document.addEventListener("DOMContentLoaded", () => {
  // Dynamically adjust the date format based on screen size
const dateElement = document.getElementById("date");
const updateDate = () => {
  const isMobile = window.innerWidth <= 480;
  const date = new Date();
  const options = isMobile? { weekday: "short", day: "numeric", month: "short" }: { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  dateElement.textContent = date.toLocaleDateString("en-US", options);
};

updateDate();
window.addEventListener("resize", updateDate);
  // Toggle sidebar on hamburger click
const hamburger = document.getElementById("hamburger");
const sidebar = document.querySelector(".sidebar");
const closeIcon = document.getElementById("close_icon");
function sidebarFun(){
  sidebar.classList.add("open");
}
function closeSideBar(){
  sidebar.classList.remove("open");


}


// Toggle search bar visibility
const searchIcon = document.getElementById("search_icon");
const searchBar = document.getElementById("input_search_bar");

searchIcon.addEventListener("click", () => {
  searchBar.classList.toggle("visible");
});


// Profile dropdown toggle
const profileIcon = document.getElementById("profile_icon");
const profileWrapper = document.querySelector(".profile_wrapper");

profileIcon.addEventListener("click", () => {
  profileWrapper.classList.toggle("show");
});

})




