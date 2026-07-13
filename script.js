// Load Header
fetch("header.html")
.then(response => response.text())
.then(data => {
    document.getElementById("header").innerHTML = data;

    // Your existing menu JS


const menuBtn = document.getElementById("menuBtn");

const nav = document.getElementById("nav");

menuBtn.addEventListener("click",()=>{

    nav.classList.toggle("active");

});



// Load Footer
fetch("footer.html")
.then(response => response.text())
.then(data => {
    document.getElementById("footer-container").innerHTML = data;
});
