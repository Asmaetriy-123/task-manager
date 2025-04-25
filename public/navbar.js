

const dateElement = document.getElementById("date");
const isMobile = window.innerWidth <= 480;

const date = new Date();
const options = isMobile
  ? { weekday: "short", day: "numeric", month: "short" } // e.g. "Fri, 25 Apr"
  : { weekday: "long", day: "numeric", month: "long", year: "numeric" }; // e.g. "Friday, 25 April, 2025"

dateElement.textContent = date.toLocaleDateString("en-US", options);


//showing the search bar when the search icon is clicked


const search_icon=document.getElementById("search_icon");
const search_bar=document.getElementById('input_search_bar');

search_icon.addEventListener('click',function(){

    search_bar.classList.toggle("visible");
})

//adding a drop_down menu when hitting th profile icon
const profileIcon = document.getElementById("profile_icon");
const profileWrapper = document.querySelector(".profile_wrapper");

profileIcon.addEventListener("click", () => {
  profileWrapper.classList.toggle("show");
});
const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
const closeIcon=document.getElementById('close_icon');
closeIcon.addEventListener('click',()=>{
  sidebar.classList.toggle('close')
})
