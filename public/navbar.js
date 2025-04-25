const date_element=document.getElementById("date")
const today=new Date()
const optionsWeekDay={weekday:'long'};
const optionsDay={day:'numeric'};
const optionsMonth={month:'long'};
const optionsYear={year:'numeric'};
const formattedDate=today.toLocaleDateString(undefined,optionsWeekDay)+" " +
today.toLocaleDateString(undefined,optionsDay)+" "+
today.toLocaleDateString(undefined,optionsMonth)+  " , "+
today.toLocaleDateString(undefined,optionsYear)
date_element.textContent=formattedDate;
console.log(formattedDate)
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